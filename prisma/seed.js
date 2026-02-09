const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      age: 30,
      role: "ADMIN", // Admin role
      password: "test1234",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      age: 25,
      role: "USER",
      password: "test1234",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      age: 28,
      role: "USER",
      password: "test1234",
    },
  ];

  for (const user of users) {
    await db.user.create({
      data: user,
    });
  }

  console.log("Seeded admin and two users successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
