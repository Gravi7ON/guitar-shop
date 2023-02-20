import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fillDb(amountProducts: number) {
  amountProducts = (isNaN(amountProducts) || (typeof amountProducts !== 'number')) ? 1 : amountProducts;
  const randomInteger = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  const titles = ['Z 474 HD', 'H 334 BD', 'J 838 LS', 'O 976 JS'];

  const products = [
    {
      product: 'аккустика',
      amountOfString: [6, 7, 12]
    },
    {
      product: 'электро',
      amountOfString: [4, 6, 7]
    },
    {
      product: 'укулеле',
      amountOfString: [4]
    }
  ]



  for (const iter of Array(amountProducts).fill(1).map((_number, index) => index += 1)) {
    const randomProduct = products[randomInteger(0, products.length - 1)];
    await prisma.product.upsert({
      where: { id: iter },
      update: {},
      create: {
        title: titles[randomInteger(0, titles.length - 1)],
        description: 'new amazing exelent cool guitar',
        image: `http://localhost:3335/api/file/test/catalog-product-${randomInteger(0, 8)}@2x.png`,
        cost: randomInteger(5000, 50000),
        productType: randomProduct.product,
        vendorCode: Math.random().toString(),
        amountOfString: randomProduct.amountOfString[randomInteger(0, randomProduct.amountOfString.length - 1)]
      }
    });
  }
}
