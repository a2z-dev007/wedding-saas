import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email")?.toLowerCase()?.trim();

    try {
      const whereClause = email
        ? {
            OR: [
              { user: { email } },
              { isPublished: true },
            ],
          }
        : {};

      const invitations = await prisma.invitation.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        include: {
          guestMessages: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      const allMessages = invitations.flatMap((inv) => inv.guestMessages);

      return NextResponse.json({
        invitations,
        messages: allMessages,
      });
    } catch (dbError) {
      console.warn("DB offline or unconfigured. Returning empty list for client fallback.", dbError);
      return NextResponse.json({ error: "Database offline" }, { status: 503 });
    }
  } catch (err) {
    console.error("GET /api/invitations error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      brideName,
      groomName,
      weddingDate,
      weddingTime,
      venueName,
      venueAddress,
      venueLat,
      venueLng,
      slug,
      heroImageUrl,
      slideshowImages,
      musicTrack,
      showDressCode,
      dressCodeText,
      showTransport,
      transportText,
      eventsJson,
      templateId,
    } = body;

    const normalizedSlug = (slug || `${brideName}-${groomName}`)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    try {
      // Find or create a default user for sandbox/demo if unauthenticated
      let user = await prisma.user.findFirst();
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: "host@unfoldwed.com",
            name: `${brideName} & ${groomName}`,
          },
        });
      }

      // Find or create a default order for demo
      let order = await prisma.order.findFirst({ where: { userId: user.id } });
      if (!order) {
        order = await prisma.order.create({
          data: {
            userId: user.id,
            templateId: templateId || "royal-lotus",
            amountPaise: 129900,
            status: "paid",
          },
        });
      }

      const invitation = await prisma.invitation.create({
        data: {
          userId: user.id,
          orderId: order.id,
          templateId: templateId || "royal-lotus",
          slug: normalizedSlug,
          brideName,
          groomName,
          weddingDate: new Date(weddingDate),
          weddingTime: weddingTime || "7:00 PM onwards",
          venueName: venueName || "The Maharaja Palace",
          venueAddress: venueAddress || "Udaipur, Rajasthan",
          venueLat: venueLat || null,
          venueLng: venueLng || null,
          heroImageUrl: heroImageUrl || null,
          slideshowImages: slideshowImages || [],
          musicTrack: musicTrack || "track1",
          showDressCode: Boolean(showDressCode),
          dressCodeText: dressCodeText || null,
          showTransport: Boolean(showTransport),
          transportText: transportText || null,
          eventsJson: eventsJson || [],
        },
      });

      return NextResponse.json(invitation, { status: 201 });
    } catch (dbError) {
      console.warn("Prisma create failed. Returning mock response for frontend.", dbError);
      return NextResponse.json(
        {
          id: `mock-${Date.now()}`,
          slug: normalizedSlug,
          brideName,
          groomName,
          templateId: templateId || "royal-lotus",
          weddingDate,
          weddingTime,
          venueName,
          venueAddress,
          eventsJson,
          slideshowImages,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("POST /api/invitations error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
