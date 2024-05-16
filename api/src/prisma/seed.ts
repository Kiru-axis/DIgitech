import { BadRequestException } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { bCryptHash } from 'src/common';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seed() {
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@gmail.com' },
  });

  if (!admin) {
    await seedUsers();
    await seedRelations();
    await seedBlogs();
    await seedProducts();
  }
}

async function seedUsers() {
  await prisma.user.createMany({
    data: [
      {
        id: 'user-1',
        email: 'admin@gmail.com',
        firstname: 'Admin',
        lastname: 'Maine',
        mobile: '12344545656',
        password: await bCryptHash('Pass1234.'),
        role: Role.ADMIN,
        image: 'assets/images/avatar-1.png',
      },
      {
        id: 'user-2',
        email: 'anna@gmail.com',
        firstname: 'Anna',
        lastname: 'Kim',
        mobile: '6789545656',
        password: await bCryptHash('Pass1234.'),
        image: 'assets/images/avatar-2.png',
      },
      {
        email: faker.internet.email(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        mobile: faker.phone.number(),
        password: await bCryptHash('Pass1234.'),
      },
      {
        email: faker.internet.email(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        mobile: faker.phone.number(),
        password: await bCryptHash('Pass1234.'),
      },
      {
        email: faker.internet.email(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        mobile: faker.phone.number(),
        password: await bCryptHash('Pass1234.'),
      },
      {
        email: faker.internet.email(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        mobile: faker.phone.number(),
        password: await bCryptHash('Pass1234.'),
      },
    ],
  });
}

async function seedRelations() {
  try {
    await prisma.brand.createMany({
      data: [
        { id: 'brand-1', name: 'Apple' },
        { id: 'brand-2', name: 'Rolex' },
        { id: 'brand-3', name: 'Microsoft' },
        { id: 'brand-4', name: 'LG' },
        { id: 'brand-5', name: 'Beats' },
      ],
    });

    await prisma.category.createMany({
      data: [
        { id: 'cat-1', name: 'TV' },
        { id: 'cat-2', name: 'Smartphone' },
        { id: 'cat-3', name: 'Watch' },
        { id: 'cat-4', name: 'Laptop' },
        { id: 'cat-5', name: 'Headphones' },
      ],
    });

    await prisma.color.createMany({
      data: [
        { id: 'black', name: 'black' },
        { id: 'white', name: 'white' },
        { id: 'brown', name: 'brown' },
        { id: 'gray', name: 'gray' },
        { id: 'pink', name: 'pink' },
      ],
    });

    await prisma.tag.createMany({
      data: [
        { id: 'special', name: 'special' },
        { id: 'popular', name: 'popular' },
        { id: 'latest', name: 'latest' },
        { id: 'featured', name: 'featured' },
        { id: 'vintage', name: 'vintage' },
      ],
    });

    await prisma.blogCategory.createMany({
      data: [
        { id: 'blog-cat-1', name: 'Lifestyle' },
        { id: 'blog-cat-2', name: 'Business' },
        { id: 'blog-cat-3', name: 'Finance' },
        { id: 'blog-cat-4', name: 'AI' },
        { id: 'blog-cat-5', name: 'Aviation' },
      ],
    });
  } catch (error) {
    throw new BadRequestException(
      `The operation requires the following: [${error.meta.constraint}] which are missing`,
    );
  }
}

export async function seedBlogs() {
  try {
    await prisma.blog.create({
      data: {
        desc: faker.word.words(40),
        title: faker.word.noun(10),
        Category: {
          connect: { id: 'blog-cat-2' },
        },
        Author: {
          connect: { id: 'user-1' },
        },
      },
    });
    await prisma.blog.create({
      data: {
        desc: faker.word.words(40),
        title: faker.word.noun(10),
        Category: {
          connect: { id: 'blog-cat-3' },
        },
        Author: {
          connect: { id: 'user-1' },
        },
      },
    });
    await prisma.blog.create({
      data: {
        desc: faker.word.words(40),
        title: faker.word.noun(10),
        Category: {
          connect: { id: 'blog-cat-4' },
        },
        Author: {
          connect: { id: 'user-1' },
        },
      },
    });
    await prisma.blog.create({
      data: {
        desc: faker.word.words(40),
        title: faker.word.noun(10),
        Category: {
          connect: { id: 'blog-cat-5' },
        },
        Author: {
          connect: { id: 'user-1' },
        },
      },
    });
  } catch (error) {
    throw new BadRequestException(
      `The operation requires the following: [${error.meta.constraint}] which are missing`,
    );
  }
}

export async function seedProducts() {
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 200 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-1',
      brandId: 'brand-1',
      Colors: {
        connect: [{ id: 'black' }, { id: 'gray' }],
      },
      Tags: {
        connect: [{ id: 'special' }],
      },
    },
  });

  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-4',
      brandId: 'brand-4',
      Colors: {
        connect: [{ id: 'pink' }, { id: 'gray' }],
      },
      Tags: {
        connect: [{ id: 'special' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-3',
      brandId: 'brand-3',
      Colors: {
        connect: [{ id: 'pink' }, { id: 'gray' }],
      },
      Tags: {
        connect: [{ id: 'special' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-2',
      brandId: 'brand-2',
      Colors: {
        connect: [{ id: 'brown' }, { id: 'pink' }, { id: 'gray' }],
      },
      Tags: {
        connect: [{ id: 'popular' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-1',
      brandId: 'brand-1',
      Colors: {
        connect: [
          { id: 'black' },
          { id: 'brown' },
          { id: 'pink' },
          { id: 'gray' },
        ],
      },
      Tags: {
        connect: [{ id: 'popular' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-5',
      brandId: 'brand-5',
      Colors: {
        connect: [{ id: 'white' }, { id: 'gray' }],
      },
      Tags: {
        connect: [{ id: 'popular' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-4',
      brandId: 'brand-4',
      Colors: {
        connect: [{ id: 'black' }, { id: 'white' }, { id: 'gray' }],
      },
      Tags: {
        connect: [{ id: 'featured' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-3',
      brandId: 'brand-3',
      Colors: {
        connect: [{ id: 'white' }, { id: 'brown' }, { id: 'pink' }],
      },
      Tags: {
        connect: [{ id: 'featured' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-2',
      brandId: 'brand-2',
      Colors: {
        connect: [{ id: 'black' }, { id: 'brown' }, { id: 'pink' }],
      },
      Tags: {
        connect: [{ id: 'featured' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-1',
      brandId: 'brand-1',
      Colors: {
        connect: [{ id: 'black' }, { id: 'white' }],
      },
      Tags: {
        connect: [{ id: 'popular' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-5',
      brandId: 'brand-5',
      Colors: {
        connect: [{ id: 'black' }, { id: 'brown' }, { id: 'gray' }],
      },
      Tags: {
        connect: [{ id: 'popular' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-4',
      brandId: 'brand-4',
      Colors: {
        connect: [{ id: 'pink' }, { id: 'gray' }],
      },
      Tags: {
        connect: [{ id: 'popular' }, { id: 'vintage' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-3',
      brandId: 'brand-3',
      Colors: {
        connect: [
          { id: 'black' },
          { id: 'white' },
          { id: 'brown' },
          { id: 'pink' },
          { id: 'gray' },
        ],
      },
      Tags: {
        connect: [
          { id: 'popular' },
          { id: 'special' },
          { id: 'latest' },
          { id: 'featured' },
          { id: 'vintage' },
        ],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-2',
      brandId: 'brand-2',
      Colors: {
        connect: [{ id: 'gray' }],
      },
      Tags: {
        connect: [{ id: 'special' }, { id: 'popular' }, { id: 'latest' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      desc: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 50, max: 1000 })),
      quantity: Math.floor(Math.random() * 200),
      categoryId: 'cat-1',
      brandId: 'brand-1',
      Colors: {
        connect: [{ id: 'black' }, { id: 'gray' }],
      },
      Tags: {
        connect: [{ id: 'latest' }, { id: 'featured' }],
      },
    },
  });
}
