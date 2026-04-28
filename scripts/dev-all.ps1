$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$serverPath = Join-Path $root "server"
$clientPath = Join-Path $root "rent-contract-checker-frontend\client"

Write-Host "Starting backend  http://localhost:3001"
Write-Host "Starting frontend http://localhost:5173"
Write-Host "Press Ctrl+C to stop both servers."
Write-Host ""

$serverJob = Start-Job -Name "backend" -ScriptBlock {
  param($path)
  Set-Location $path
  npm.cmd run dev
} -ArgumentList $serverPath

$clientJob = Start-Job -Name "frontend" -ScriptBlock {
  param($path)
  Set-Location $path
  npm.cmd run dev
} -ArgumentList $clientPath

try {
  while ($true) {
    Receive-Job -Job $serverJob, $clientJob

    $stoppedJob = Get-Job -Id $serverJob.Id, $clientJob.Id |
      Where-Object { $_.State -in @("Completed", "Failed", "Stopped") } |
      Select-Object -First 1

    if ($stoppedJob) {
      Receive-Job -Job $serverJob, $clientJob
      throw "$($stoppedJob.Name) server stopped with state $($stoppedJob.State)."
    }

    Start-Sleep -Milliseconds 500
  }
}
finally {
  Stop-Job -Job $serverJob, $clientJob -ErrorAction SilentlyContinue
  Remove-Job -Job $serverJob, $clientJob -Force -ErrorAction SilentlyContinue
}
