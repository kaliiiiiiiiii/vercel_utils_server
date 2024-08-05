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
  const url = searchParams.get('url');
  const args = searchParams.getAll('arg'); // Accept multiple arguments

  if (!url) {
    return new NextResponse('Bad Request: "url" query parameter is required\nsee https://github.com/kaliiiiiiiiii/vercel_utils_server for usage', { status: 400 });
  }

  // Construct the PowerShell script
  const psScript = `
param (
    [string]$Url = '${escapeSpecialChars(url)}',
    [string[]]$Arguments = @(${args.map(arg => `'${escapeSpecialChars(arg)}'`).join(', ')})
)
$tempFilePath = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), [System.IO.Path]::GetRandomFileName() + ".exe")

try {
    Invoke-WebRequest -Uri $Url -OutFile $tempFilePath

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo.FileName = $tempFilePath
    $process.StartInfo.Arguments = $Arguments -join " "  # Convert array to a space-separated string
    $process.StartInfo.UseShellExecute = $false
    $process.StartInfo.RedirectStandardOutput = $true
    $process.StartInfo.RedirectStandardError = $true
    $process.StartInfo.CreateNoWindow = $true

    $process.add_OutputDataReceived({
        if ($_.Data) {
            [Console]::WriteLine($_.Data)
        }
    })

    $process.add_ErrorDataReceived({
        if ($_.Data) {
            [Console]::WriteLine($_.Data)
        }
    })

    $process.Start() | Out-Null
    $process.BeginOutputReadLine()
    $process.BeginErrorReadLine()
    $process.WaitForExit()
} catch {
    [Console]::WriteLine("An error occurred: $_")
} finally {
    if (Test-Path $tempFilePath) {
        Remove-Item $tempFilePath -Force
    }
}
`;

  return new NextResponse(psScript, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}