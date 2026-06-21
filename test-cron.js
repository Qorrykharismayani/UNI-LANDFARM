const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const schedule = await prisma.contentSchedule.findFirst({
    orderBy: { createdAt: 'desc' }
  });
  console.log("Last Schedule:", schedule);
  
  // Set it back to 'Scheduled'
  if (schedule && schedule.status === 'Failed') {
    await prisma.contentSchedule.update({
      where: { id: schedule.id },
      data: { status: 'Scheduled' }
    });
    console.log("Re-scheduled.");
  }

  // Trigger the endpoint
  const res = await fetch('http://localhost:3000/api/cron/process-schedules');
  const json = await res.json();
  console.log("Cron result:", JSON.stringify(json, null, 2));
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
