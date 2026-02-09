import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Admin', email: 'admin@example.com', role: 'ADMIN' },
      { name: 'Partner 1', email: 'partner1@example.com', role: 'PARTNER' },
      { name: 'Customer 1', email: 'customer1@example.com', role: 'CUSTOMER' }
    ],
    skipDuplicates: true
  });

  const p = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: { name: 'Product A', price: 25.0 }
  });

  // create a sale example
  const partner = await prisma.user.findFirst({ where: { role: 'PARTNER' } });
  const customer = await prisma.user.findFirst({ where: { role: 'CUSTOMER' } });
  if (partner && customer) {
    await prisma.sale.create({
      data: {
        productId: p.id,
        partnerId: partner.id,
        customerId: customer.id,
        value: p.price
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
