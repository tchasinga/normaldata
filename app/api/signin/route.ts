/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


// adding singin route
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password }: { email: string; password: string } = body;

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Compare the password
        if (!user.password) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
        }

        return NextResponse.json({ message: 'User signed in successfully', user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
    }
}
