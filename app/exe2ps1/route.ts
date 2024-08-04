import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Bad Request: "url" query parameter is required', { status: 400 });
  }

  return new NextResponse(url, { status: 200 });
}
