/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// adding singup route
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name }: { email: string; password: string; name?: string } = body;

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
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

        return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
    }
}
