Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\acer\.gemini\antigravity-ide\brain\aed71580-56bc-4d2a-b121-c835009b04e8\media__1781270855113.png'
$dest = 'C:\Users\acer\Downloads\uni-landfarm-landing-page\public\logo.png'
$temp = 'C:\Users\acer\.gemini\antigravity-ide\scratch\temp_logo.png'

Write-Output "Loading bitmap from $src..."
$bmp = New-Object System.Drawing.Bitmap($src)

Write-Output "Making background transparent..."
$bmp.MakeTransparent([System.Drawing.Color]::White)

Write-Output "Saving transparent bitmap to $temp..."
$bmp.Save($temp, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Output "Copying to source and destination..."
Copy-Item -Path $temp -Destination $src -Force
Copy-Item -Path $temp -Destination $dest -Force

Write-Output "Cleaning up temporary file..."
Remove-Item -Path $temp -Force

Write-Output "SUCCESS: Background removed successfully!"
