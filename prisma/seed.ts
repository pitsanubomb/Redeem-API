import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();
const userRepo = prisma.user;

const role: Role = 'ADMIN';

const userAdminData = [
  {
    email: 'admin@demo.com',
    password: 'p@ssw0rd',
    role: role,
    firstName: 'Admin',
    lastName: 'Demo',
  },
];

const main = async (): Promise<void> => {
  console.info('Start run seed . . .');
  for (const admin of userAdminData) {
    await userRepo.create({ data: admin });
  }
  console.info('Start seed done');
};

main()
  .catch((e) => {
    console.error('Errors : ', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
