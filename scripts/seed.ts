import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
    },
  });
  console.log("کاربر نمونه ایجاد شد");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
