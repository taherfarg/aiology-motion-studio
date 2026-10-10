param([Parameter(Position=0)][string]$Task='dev',[Parameter(ValueFromRemainingArguments=$true)][string[]]$TaskArgs)
$ErrorActionPreference='Stop'
$runtimeDir=Join-Path $env:LOCALAPPDATA 'AIOLOGY\runtime\node-v24.21.0-win-x64'
if(Test-Path (Join-Path $runtimeDir 'node.exe')){$env:PATH="$runtimeDir;$env:PATH"}
Push-Location $PSScriptRoot
try { & npm.cmd run $Task -- @TaskArgs; exit $LASTEXITCODE } finally {Pop-Location}
