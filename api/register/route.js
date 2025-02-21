import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, password, name } = req.body;

            // Check if the user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword, 
                },
            });

            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'We only support POST' });
    }
}
