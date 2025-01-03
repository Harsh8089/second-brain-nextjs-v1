import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            username: "test",
            email: "test@gmail.com",
            password: "$2a$10$KvXZ9jq3b9eS17Hk9RNde.xhbqNQrzTaIJCshF7yAF6LwKDowdgZK",
            updatedAt: new Date()
        }
    })

    console.log('User seed into db: '+user);
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1)
})