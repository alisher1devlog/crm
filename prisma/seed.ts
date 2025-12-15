import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;
  const fullName = process.env.SUPER_ADMIN_NAME;

  if (!email || !password || !fullName) {
    console.error('❌ Xatolik: .env faylida SUPER_ADMIN ma\'lumotlari yetishmayapti!');
    process.exit(1);
  }

  // 2. Parolni shifrlaymiz
  const hashedPassword = await bcrypt.hash(password, 10);

  const superAdmin = await prisma.superAdmin.upsert({
    where: { email: email },
    update: {
      password: hashedPassword,
    },
    create: {
      fullName: fullName,
      email: email,
      password: hashedPassword,
    },
  });

  console.log('✅ Real Project Seeding: Super Admin yaratildi!');
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Parol: .env faylidagi parol`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });