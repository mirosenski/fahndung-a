import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Prüfen ob Admin-Benutzer bereits existiert
    const existingAdmin = await prisma.user.findFirst({
      where: { email: "admin@fahndung.de" }
    });

    if (existingAdmin) {
      return res.status(200).json({ 
        message: "Admin-Benutzer existiert bereits",
        user: existingAdmin 
      });
    }

    // Demo-Admin-Benutzer erstellen
    const demoUser = await prisma.user.create({
      data: {
        name: "Administrator",
        email: "admin@fahndung.de",
        role: "ADMIN",
      },
    });

    return res.status(200).json({ 
      message: "Demo-Admin-Benutzer erstellt",
      user: demoUser 
    });
  } catch (error) {
    console.error("Fehler beim Erstellen des Demo-Benutzers:", error);
    return res.status(500).json({ 
      message: "Fehler beim Erstellen des Demo-Benutzers",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  } finally {
    await prisma.$disconnect();
  }
} 