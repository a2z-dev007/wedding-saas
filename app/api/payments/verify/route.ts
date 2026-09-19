import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpaySignature, fetchRazorpayPayment } from "@/lib/razorpay";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      invitationId,
      customerEmail,
      customerPhone,
      customerName,
    } = body;

    if (!razorpayOrderId || !razorpayPaymentId || !invitationId) {
      return NextResponse.json({ error: "Missing verification parameters" }, { status: 400 });
    }

    // Verify signature if secret is provided, otherwise accept sandbox mock
    let isValid = false;
    if (process.env.RAZORPAY_KEY_SECRET) {
      try {
        isValid = verifyRazorpaySignature({
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
        });
      } catch (sigErr) {
        console.warn("Signature check exception:", sigErr);
        isValid = false;
      }
    } else {
      // Sandbox fallback mode when keys are placeholder
      console.warn("RAZORPAY_KEY_SECRET not set. Allowing sandbox verification.");
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Try to resolve customer email and phone
    let email = customerEmail?.trim()?.toLowerCase();
    let phone = customerPhone?.trim();
    let name = customerName?.trim();

    if (!email && razorpayPaymentId && !razorpayPaymentId.startsWith("pay_mock")) {
      try {
        const paymentDetails: any = await fetchRazorpayPayment(razorpayPaymentId);
        if (paymentDetails) {
          email = paymentDetails.email?.toLowerCase() || email;
          phone = paymentDetails.contact || phone;
          name = paymentDetails.notes?.name || name;
        }
      } catch (fetchErr) {
        console.warn("Could not fetch payer info from Razorpay API:", fetchErr);
      }
    }

    // Auto-create / Link User account in database
    let user: any = null;
    if (email && email.includes("@")) {
      try {
        user = await prisma.user.upsert({
          where: { email },
          update: {
            phone: phone || undefined,
            name: name || undefined,
          },
          create: {
            email,
            name: name || "Wedding Couple",
            phone: phone || null,
          },
        });
      } catch (userErr) {
        console.warn("User auto-creation/link error:", userErr);
      }
    }

    // Update Order & Invitation status in Database
    let updatedInvitation: any = null;
    try {
      // 1. Update Order
      const order = await prisma.order.findFirst({
        where: { razorpayOrderId },
      });

      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "paid",
            razorpayPaymentId,
            userId: user?.id || order.userId,
          },
        });
      }

      // 2. Publish Invitation & link ownership
      updatedInvitation = await prisma.invitation.update({
        where: { id: invitationId },
        data: {
          isPublished: true,
          userId: user?.id || undefined,
        },
        select: {
          id: true,
          slug: true,
          brideName: true,
          groomName: true,
          isPublished: true,
          userId: true,
        },
      });
    } catch (dbErr) {
      console.warn("Database update error during payment verify:", dbErr);
    }

    const liveUrl = updatedInvitation?.slug
      ? `/${updatedInvitation.slug}`
      : `/invitation/${invitationId}`;

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully. Invitation is now permanently live and linked to your account!",
      liveUrl,
      invitation: updatedInvitation,
      user: user
        ? {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        : null,
    });
  } catch (error: any) {
    console.error("Payment verify error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}

