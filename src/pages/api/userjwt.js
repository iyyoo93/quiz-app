// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

const secret = "my-secret-key";

export default async function handler(req, res) {
  try {
    // Get the JWT from the request header or query parameter, or from a cookie
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      console.log("if----", token);

      res.status(400).json({ error: "No JWT present" });
    }
    // Validate and decode the JWT
    console.log("token----", token);

    const decoded = verify(token, secret);
    // const { payload } = decoded;
    console.log(decoded);

    // You can now access the payload of the JWT in the "payload" object

    // Call the employee database using Prisma
    // const employees = await prisma.employee.findUnique({
    //     where: {
    //         email_id: decoded.email_id
    //     }
    // });

    // const employeeReports = await prisma.report.findMany({
    //     where: {
    //         employee_id: decoded.id
    //     }
    // })

    // const hotels = await prisma.hotel.findMany()
    // Send the response
    res.status(200).json({ decoded });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
