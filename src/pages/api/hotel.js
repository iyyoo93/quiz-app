// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Get the JWT from the request header or query parameter, or from a cookie
    const slug = req.query.slug;
    const hotel = await prisma.hotel.findUnique({
      where: {
        slug,
      },
    });

    res.status(200).json({ hotel });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
