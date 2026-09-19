import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, phone } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name ? name.trim() : "Wedding Host";
    const normalizedPhone = phone ? phone.trim() : null;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      if (existingUser.passwordHash) {
        return NextResponse.json(
          { error: "An account with this email already exists. Please log in with your password or Google." },
          { status: 400 }
        );
      }

      // User exists without password (e.g. from previous payment or OAuth) -> update with password
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          passwordHash: hashedPassword,
          name: existingUser.name || normalizedName,
          phone: existingUser.phone || normalizedPhone,
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Account secured with password successfully!",
        user: updatedUser,
      });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash: hashedPassword,
        name: normalizedName,
        phone: normalizedPhone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account registered successfully!",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to register account." },
      { status: 500 }
    );
  }
}
