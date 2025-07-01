import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { name, role, identifier } = await req.json();
    if (!name || !role || !identifier) return NextResponse.json({ error: 'Missing name, role, or identifier' }, { status: 400 });
    const user = await db.user.create({
      data: { name, role, identifier },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Identifier already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create user', details: String(error) }, { status: 500 });
  }
} 