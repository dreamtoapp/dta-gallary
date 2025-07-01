import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(req: NextRequest, { params }: { params: { identifier: string } }) {
  try {
    const { identifier } = params;
    if (!identifier) return NextResponse.json({ error: 'Missing identifier' }, { status: 400 });
    const user = await db.user.findUnique({
      where: { identifier },
      include: {
        images: true,
        comments: true,
      },
    });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user', details: String(error) }, { status: 500 });
  }
} 