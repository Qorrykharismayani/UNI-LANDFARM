import { NextResponse } from 'next/server';

// Deprecated endpoint since Article model is replaced by ContentSchedule
export async function GET() {
  return NextResponse.json({ success: true, message: 'Rute ini telah didepresiasi. Silakan gunakan /api/content-schedules.', data: [] });
}

export async function POST() {
  return NextResponse.json({ success: false, message: 'Rute ini telah didepresiasi. Silakan gunakan /api/content-schedules.' }, { status: 410 });
}
export async function DELETE() {
  return NextResponse.json({ success: false, message: 'Rute ini telah didepresiasi. Silakan gunakan /api/content-schedules.' }, { status: 410 });
}

