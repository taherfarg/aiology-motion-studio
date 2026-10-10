$ErrorActionPreference='Stop'
$canonicalSkill=[System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../.agents/skills/aiology-motion-studio'))
if(!(Test-Path -LiteralPath (Join-Path $canonicalSkill 'SKILL.md'))){throw 'Canonical skill is missing'}
$userSkillsDir=Join-Path ([Environment]::GetFolderPath('UserProfile')) '.agents/skills'
New-Item -ItemType Directory -Force -Path $userSkillsDir | Out-Null
$globalSkillPath=Join-Path $userSkillsDir 'aiology-motion-studio'
if(Test-Path -LiteralPath $globalSkillPath){
  $existingSkill=Get-Item -LiteralPath $globalSkillPath
  if($existingSkill.LinkType -ne 'Junction' -or [System.IO.Path]::GetFullPath($existingSkill.Target) -ne $canonicalSkill){throw "Existing skill at $globalSkillPath differs; preserved. Inspect before changing."}
}else{
  New-Item -ItemType Junction -Path $globalSkillPath -Target $canonicalSkill | Out-Null
}
$canonicalHash=(Get-FileHash -LiteralPath (Join-Path $canonicalSkill 'SKILL.md')).Hash
$installedHash=(Get-FileHash -LiteralPath (Join-Path $globalSkillPath 'SKILL.md')).Hash
if($canonicalHash -ne $installedHash){throw 'Installed skill differs from canonical source'}
Write-Output "Skill junction verified: $globalSkillPath -> $canonicalSkill"
