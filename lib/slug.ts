import prisma from "@/lib/prisma";

/**
 * Generates a collision-free, URL-friendly unique slug.
 * If base slug is already taken by another invitation, appends a clean 4-char suffix.
 */
export async function generateUniqueSlug(
  baseText: string,
  currentInvitationId?: string
): Promise<string> {
  const cleanBase = baseText
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "our-wedding";

  try {
    let candidate = cleanBase;
    let existing = await prisma.invitation.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || (currentInvitationId && existing.id === currentInvitationId)) {
      return candidate;
    }

    // Generate unique slug with clean random suffix (e.g., siya-kabir-7k2m)
    for (let i = 0; i < 10; i++) {
      const suffix = Math.random().toString(36).substring(2, 6);
      candidate = `${cleanBase}-${suffix}`;
      existing = await prisma.invitation.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });

      if (!existing || (currentInvitationId && existing.id === currentInvitationId)) {
        return candidate;
      }
    }

    // Fallback timestamp suffix
    return `${cleanBase}-${Date.now().toString(36).slice(-4)}`;
  } catch (err) {
    console.warn("Slug uniqueness check database fallback:", err);
    return `${cleanBase}-${Date.now().toString(36).slice(-4)}`;
  }
}
