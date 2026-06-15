import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const srcPath = 'C:\\Users\\acer\\.gemini\\antigravity-ide\\brain\\a797a363-7e9d-46da-8844-58c13282ea7c\\media__1781451512453.png';
    const destPath = 'C:\\Users\\acer\\Downloads\\uni-landfarm-landing-page\\public\\logo.png';
    
    fs.copyFileSync(srcPath, destPath);
    return NextResponse.json({ success: true, message: 'Copied successfully!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
