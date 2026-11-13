Add-Type -AssemblyName System.Drawing

$srcPath = Resolve-Path "template\assets\hero-enduro.jpg"
$destPath = "$PWD\template\assets\hero-enduro.png"

Write-Host "Reading source $srcPath..."
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height

$dst = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dstData = $dst.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bytes = $w * $h * 4
$srcBuffer = New-Object byte[] $bytes
$dstBuffer = New-Object byte[] $bytes
[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcBuffer, 0, $bytes)

$bgR = 231.0
$bgG = 229.0
$bgB = 230.0
$bgL = ($bgR * 0.299 + $bgG * 0.587 + $bgB * 0.114)

for ($y = 0; $y -lt $h; $y++) {
    $distY = [double]($h - 1 - $y)
    $fadeY = [Math]::Min(1.0, [Math]::Max(0.0, ($distY - 15.0) / 70.0))
    $smoothY = $fadeY * $fadeY * (3.0 - 2.0 * $fadeY)

    for ($x = 0; $x -lt $w; $x++) {
        $idx = ($y * $w + $x) * 4

        # Hard zero border of 15px on all outer edges
        if ($x -lt 15 -or $x -ge $w - 15 -or $y -lt 15 -or $y -ge $h - 15) {
            $dstBuffer[$idx] = 0
            $dstBuffer[$idx + 1] = 0
            $dstBuffer[$idx + 2] = 0
            $dstBuffer[$idx + 3] = 0
            continue
        }

        $b = $srcBuffer[$idx]
        $g = $srcBuffer[$idx + 1]
        $r = $srcBuffer[$idx + 2]

        $lum = ($r * 0.299 + $g * 0.587 + $b * 0.114)
        $diffR = [Math]::Abs($r - $bgR)
        $diffG = [Math]::Abs($g - $bgG)
        $diffB = [Math]::Abs($b - $bgB)
        $maxDiff = [Math]::Max($diffR, [Math]::Max($diffG, $diffB))
        $colorSpread = [Math]::Max([Math]::Abs($r - $g), [Math]::Max([Math]::Abs($g - $b), [Math]::Abs($r - $b)))

        # Edge distance fade for x
        $distX = [double][Math]::Min($x - 15, ($w - 16) - $x)
        $fadeX = [Math]::Min(1.0, [Math]::Max(0.0, $distX / 80.0))
        $smoothX = $fadeX * $fadeX * (3.0 - 2.0 * $fadeX)
        $edgeFade = $smoothX * $smoothY

        if ($y -gt 910 -and $colorSpread -lt 14 -and $lum -lt $bgL) {
            # Floor shadow area
            $shadowStrength = ($bgL - $lum) / $bgL
            if ($shadowStrength -lt 0.035) {
                $dstBuffer[$idx] = 0
                $dstBuffer[$idx + 1] = 0
                $dstBuffer[$idx + 2] = 0
                $dstBuffer[$idx + 3] = 0
            } else {
                $normShadow = ($shadowStrength - 0.035) / (1.0 - 0.035)
                # Apply edge fade so boundary is guaranteed 0 alpha
                $finalShadow = $normShadow * $edgeFade
                $alphaVal = [Math]::Min(255, [Math]::Max(0, [int]($finalShadow * 1.35 * 255)))

                $dstBuffer[$idx] = 20
                $dstBuffer[$idx + 1] = 20
                $dstBuffer[$idx + 2] = 20
                $dstBuffer[$idx + 3] = [byte]$alphaVal
            }
        } elseif ($maxDiff -lt 14 -and $colorSpread -lt 8) {
            # Pure studio background
            $dstBuffer[$idx] = 0
            $dstBuffer[$idx + 1] = 0
            $dstBuffer[$idx + 2] = 0
            $dstBuffer[$idx + 3] = 0
        } elseif ($maxDiff -lt 26 -and $colorSpread -lt 12) {
            # Antialiased soft edge
            $t = ($maxDiff - 14) / (26.0 - 14.0)
            $alphaVal = [Math]::Min(255, [Math]::Max(0, [int]($t * 255)))
            $dstBuffer[$idx] = $b
            $dstBuffer[$idx + 1] = $g
            $dstBuffer[$idx + 2] = $r
            $dstBuffer[$idx + 3] = [byte]$alphaVal
        } else {
            # Motorcycle body / tires / mechanics
            $dstBuffer[$idx] = $b
            $dstBuffer[$idx + 1] = $g
            $dstBuffer[$idx + 2] = $r
            $dstBuffer[$idx + 3] = 255
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($dstBuffer, 0, $dstData.Scan0, $bytes)
$src.UnlockBits($srcData)
$dst.UnlockBits($dstData)

$dst.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Successfully saved clean PNG to $destPath"

$src.Dispose()
$dst.Dispose()
