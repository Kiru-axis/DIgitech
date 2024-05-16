export const prismaProductResponse = {
  id: true,
  title: true,
  desc: true,
  price: true,
  quantity: true,
  sold: true,
  totalRating: true,
  available: true,
  images: true,
  reviewersCount: true,
  createdAt: true,
  Brand: {
    select: { name: true, id: true },
  },
  Category: {
    select: { name: true, id: true },
  },
  Colors: {
    select: { name: true, id: true },
  },
  Tags: {
    select: { name: true, id: true },
  },
  Reviews: {
    select: {
      id: true,
      comment: true,
      productId: true,
      star: true,
      updatedAt: true,
      User: {
        select: {
          firstname: true,
          lastname: true,
          image: true,
          id: true,
        },
      },
    },
  },
};
