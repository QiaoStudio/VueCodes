git pull

$ab = git branch -r
[Double]$cs = 0
foreach ($b in $ab) {
  $b = $b.ToString().Trim()
  if ($b.StartsWith('origin/sprint/')) {
    $temp = $b.Replace('origin/sprint/', '') -as [Double]
    $temp.gettype().name
    if ($temp -gt $cs) {
      $cs = $temp
    }
  }
}
$currentSprint =  'sprint/' + $cs
git checkout $currentSprint
git pull
$cs += 0.1

$sprint = 'sprint/' + $cs

git branch $sprint

# update package.json sprint value.
git push origin $sprint':'$sprint

$tb = 'test/' + $cs

git branch $tb
git push origin $tb':'$tb

Function lockBranch([string]$repo, [string]$branch){
  $uri = "https://api.github.com/repos/gobear/$($repo)/branches/$($branch)/protection";
  $github_auth = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes("gobear-ci:6a6fe7cc77284ebbcc54b05617748832946500ee"));
  $users = @();

  $toUpdate = @{
      enforce_admins=$True;
      required_status_checks=$null;
      required_pull_request_reviews = $null;
        restrictions= @{
            users=$users;
            teams=@()
        }
  } | ConvertTo-Json;
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  invoke-webrequest -uri $uri -method PUT -headers @{"Accept"="application/vnd.github.loki-preview+json";"Authorization"="Basic " + $github_auth} -contenttype "application/json" -body $toUpdate -UseBasicParsing;
  write-output "branch $($branch) of repo $($repo) has been locked";
}

$repository = 'Vue Codes'
# Branch will be locked by git branch settings
# lockBranch -repo $repository -branch $sprint

Function UpdateVersion()
{
    $versionPath = ".\config\version.js";
    $versionContent = Get-Content $versionPath;
    $version = "WrongVersionSetting";
    Try{
        $regExpression = 'accp' + ": \'[a-zA-Z0-9\-]+\'";
        $versionStr = [regex]::Match($versionContent, $regExpression).captures.groups.value.split(":")[1].Trim();
        $version = $versionStr.Trim().Substring(1, $versionStr.Length -2);
    }
    Catch{
        Write-Host "Wrong Version Setting"
    }
    $newVersion = ($cs).ToString().Replace('.','') + '-' + (Get-Date -Format MMddyyyy)
    ($versionContent).Replace($version, $newVersion) | Set-Content $versionPath
    Write-Host "New Version seted, Version Number:" + $newVersion
}
# UpdateVersion required permission to push to accp
# UpdateVersion

# git add .
# git commit -m 'update accp version number'
# git push origin 'accp:accp'
