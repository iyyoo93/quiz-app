// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const secret = "my-secret-key";

export default async function handler(req, res) {
  const { email_id, password } = req.body;

  if (!email_id || !password) {
    res.status(403).json("Invalid data passed");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      email_id: email_id,
    },
  });

  if (!employee) {
    res.status(400).json("No User found");
  }

  if (employee?.password != password) {
    res.status(400).json("Invalid user name or password");
  }

  const jwtToken = jwt.sign({ ...employee, expiresIn: "1h" }, secret);
  console.log(Object.keys(res));

  res.setHeader("Set-Cookie", `jwt=${jwtToken}; Path=/`);

  res.status(200).json({ data: jwtToken });
}
