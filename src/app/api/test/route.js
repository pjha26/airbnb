import { NextResponse } from 'next/server';

export async function POST(req) {
    return NextResponse.json({ message: 'API route is working!' });
}

export async function GET(req) {
    return NextResponse.json({ message: 'GET works too!' });
}
