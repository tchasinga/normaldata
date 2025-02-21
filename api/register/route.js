import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// creating a singup function (Nextjs API route)
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const user = await prisma.user.create({
        data: {
            
            email,
            password,
        },
        });
        res.json(user);
    } else {
        res.status(405).json({ message: 'We only support POST' });
    }
}

