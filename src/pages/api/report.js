// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const secret = "my-secret-key";

export default async function handler(req, res) {
  try {
    // Get the JWT from the request header or query parameter, or from a cookie
    const reportId = req.query.id;
    const report = await prisma.report.findUnique({
      where: {
        id: parseInt(reportId, 10),
      },
    });

    res.status(200).json({ report });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
