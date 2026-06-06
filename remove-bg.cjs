const Jimp = require('jimp');

async function removeWhiteBackground() {
  try {
    const image = await Jimp.read('./public/logo.png');
    
    // Iterate through all pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      // Get RGBA values
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      // Check if pixel is white or very close to white (tolerance)
      if (red > 240 && green > 240 && blue > 240) {
        // Make it transparent
        this.bitmap.data[idx + 3] = 0;
      }
    });

    await image.writeAsync('./public/logo.png'); // overwrite
    console.log('Background removed successfully!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

removeWhiteBackground();
