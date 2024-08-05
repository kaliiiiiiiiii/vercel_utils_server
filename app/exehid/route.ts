import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const url = searchParams.get('url');
  const args = searchParams.getAll('arg'); // Accept multiple arguments

  if (!url) {
    return new NextResponse('Bad Request: "url" query parameter is required\nsee https://github.com/kaliiiiiiiiii/vercel_utils_server for usage', { status: 400 });
  }

  // Construct the new URL for the exe2ps1 endpoint
  const encodedUrl = encodeURIComponent(url);
  const encodedArgs = args.map(arg => `arg=${encodeURIComponent(arg)}`).join('&');
  const exe2ps1Url = `${origin}/exe2ps1?url=${encodedUrl}${encodedArgs ? `&${encodedArgs}` : ''}`;

  // Construct the redirect URL for the pshid endpoint
  const redirectUrl = `${origin}/pshid?url=${encodeURIComponent(exe2ps1Url)}`;

  return NextResponse.redirect(redirectUrl, 302);
}
