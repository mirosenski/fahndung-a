import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Admin-Benutzer erstellen
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@fahndung.de' },
    update: {},
    create: {
      email: 'admin@fahndung.de',
      name: 'Administrator',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', adminUser);

  // Beispiel-Fahndungen erstellen
  const investigation1 = await prisma.investigation.upsert({
    where: { caseNumber: 'BW-1234/1' },
    update: {},
    create: {
      caseNumber: 'BW-1234/1',
      title: 'Max Mustermann',
      category: 'WANTED_PERSON',
      priority: 'URGENT',
      location: 'Stuttgart',
      date: new Date('2024-06-01'),
      status: 'PUBLISHED',
      age: 35,
      height: '1,80m',
      build: 'Schlank',
      hairColor: 'Braun',
      eyes: 'Blau',
      features: 'Tattoo am linken Unterarm',
      clothing: 'Schwarze Jeans, weißes T-Shirt',
      tel: '0711-123456',
      station: 'Polizeirevier Stuttgart-Mitte',
    },
  });

  const investigation2 = await prisma.investigation.upsert({
    where: { caseNumber: 'BW-5678/2' },
    update: {},
    create: {
      caseNumber: 'BW-5678/2',
      title: 'Anna Beispiel',
      category: 'MISSING_PERSON',
      priority: 'NORMAL',
      location: 'Karlsruhe',
      date: new Date('2024-05-30'),
      status: 'DRAFT',
      age: 28,
      height: '1,65m',
      build: 'Mittel',
      hairColor: 'Blond',
      eyes: 'Grün',
      features: 'Brille',
      clothing: 'Rote Jacke, blaue Hose',
      tel: '0721-654321',
      station: 'Polizeirevier Karlsruhe',
    },
  });

  console.log('✅ Sample investigations created:', { investigation1, investigation2 });

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 