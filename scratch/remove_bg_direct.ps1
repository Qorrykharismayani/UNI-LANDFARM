Add-Type -AssemblyName System.Drawing

$files = @(
    "c:\Users\acer\Downloads\uni-landfarm-landing-page\public\logo.png",
    "C:\Users\acer\.gemini\antigravity-ide\brain\aed71580-56bc-4d2a-b121-c835009b04e8\media__1781270855113.png"
)

function Process-File($filePath) {
    if (-not (Test-Path $filePath)) {
        Write-Output "File not found (skipping): $filePath"
        return
    }

    Write-Output "Processing image: $filePath"
    $bmp = New-Object System.Drawing.Bitmap($filePath)
    $width = $bmp.Width
    $height = $bmp.Height

    $replacementColor = [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
    $queue = [System.Collections.Generic.Queue[System.Drawing.Point]]::new()
    $visited = New-Object 'System.Boolean[,]' $width, $height

    function IsWhiteLike($pixel) {
        return ($pixel.R -gt 240 -and $pixel.G -gt 240 -and $pixel.B -gt 240 -and $pixel.A -eq 255)
    }

    # Add top and bottom border pixels
    for ($x = 0; $x -lt $width; $x++) {
        foreach ($y in @(0, $height - 1)) {
            $pixel = $bmp.GetPixel($x, $y)
            if (IsWhiteLike $pixel) {
                $queue.Enqueue([System.Drawing.Point]::new($x, $y))
                $visited[$x, $y] = $true
            }
        }
    }

    # Add left and right border pixels
    for ($y = 0; $y -lt $height; $y++) {
        foreach ($x in @(0, $width - 1)) {
            if (-not $visited[$x, $y]) {
                $pixel = $bmp.GetPixel($x, $y)
                if (IsWhiteLike $pixel) {
                    $queue.Enqueue([System.Drawing.Point]::new($x, $y))
                    $visited[$x, $y] = $true
                }
            }
        }
    }

    $directions = @(
        [System.Drawing.Point]::new(-1, 0),
        [System.Drawing.Point]::new(1, 0),
        [System.Drawing.Point]::new(0, -1),
        [System.Drawing.Point]::new(0, 1)
    )

    $count = 0
    while ($queue.Count -gt 0) {
        $pt = $queue.Dequeue()
        $bmp.SetPixel($pt.X, $pt.Y, $replacementColor)
        $count++

        foreach ($dir in $directions) {
            $nx = $pt.X + $dir.X
            $ny = $pt.Y + $dir.Y

            if ($nx -ge 0 -and $nx -lt $width -and $ny -ge 0 -and $ny -lt $height) {
                if (-not $visited[$nx, $ny]) {
                    $pixel = $bmp.GetPixel($nx, $ny)
                    if (IsWhiteLike $pixel) {
                        $queue.Enqueue([System.Drawing.Point]::new($nx, $ny))
                        $visited[$nx, $ny] = $true
                    }
                }
            }
        }
    }

    $tempPath = $filePath + ".temp.png"
    $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()

    # Overwrite original image using standard .NET APIs to avoid provider issues
    [System.IO.File]::Copy($tempPath, $filePath, $true)
    [System.IO.File]::Delete($tempPath)
    Write-Output "Successfully saved transparent logo to $filePath"
}

foreach ($file in $files) {
    Process-File $file
}
