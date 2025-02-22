import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add create data for Post model using prisma
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, title, content, description, authorId }: { name: string; title: string; content: string; description: string; authorId: string } = body;

        // Create a new post
        const post = await prisma.post.create({
            data: {
                name,
                title,
                content,
                description,
                author: {
                    connect: { id: authorId }
                }
            }
        });
        return NextResponse.json({ 
            message: 'Post created successfully', 
            post 
        }, 
        { status: 200 });
    } catch (error: unknown) {
        console.error('Error creating post:', (error as Error).message);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}