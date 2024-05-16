export const prismaBlogResponse = {
  // firstname: string; lastname: string; id: string; image?: string
  id: true,
  title: true,
  desc: true,
  updatedAt: true,
  categoryId: true,
  image: true,
  Author: {
    select: { firstname: true, lastname: true, image: true, id: true },
  },
  Category: {
    select: {
      name: true,
    },
  },
};
