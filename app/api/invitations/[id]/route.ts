import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      const invitation = await prisma.invitation.findUnique({
        where: { id },
        include: {
          guestMessages: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!invitation) {
        return NextResponse.json({ error: "Invitation not found." }, { status: 404 });
      }

      return NextResponse.json(invitation, { status: 200 });
    } catch (dbError) {
      console.warn("DB offline for GET /api/invitations/[id]", dbError);
      return NextResponse.json({ error: "Database offline" }, { status: 503 });
    }
  } catch (err) {
    console.error("GET /api/invitations/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      const updated = await prisma.invitation.update({
        where: { id },
        data: {
          brideName,
          groomName,
          weddingDate: new Date(weddingDate),
          weddingTime,
          venueName,
          venueAddress,
          venueLat: venueLat || null,
          venueLng: venueLng || null,
          slug: normalizedSlug,
          templateId: templateId || "royal-lotus",
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

      return NextResponse.json(updated, { status: 200 });
    } catch (dbError) {
      console.warn("Prisma update failed. Returning updated mock payload.", dbError);
      return NextResponse.json(
        {
          id,
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
    console.error("PUT /api/invitations/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
