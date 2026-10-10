$ErrorActionPreference='Stop'
$userSkillPath=Join-Path ([Environment]::GetFolderPath('UserProfile')) '.agents/skills/aiology-motion-studio'
if(Test-Path -LiteralPath $userSkillPath){
  $skillLink=Get-Item -LiteralPath $userSkillPath
  $canonicalPath=if($skillLink.LinkType){$skillLink.Target}else{$skillLink.FullName}
}else{$canonicalPath=[System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))}
$studioRoot=[System.IO.Path]::GetFullPath((Join-Path $canonicalPath '../../..'))
if(!(Test-Path -LiteralPath (Join-Path $studioRoot 'package.json'))){throw 'Studio was moved. Reinstall its skill junction from the new studio location.'}
Write-Output $studioRoot
