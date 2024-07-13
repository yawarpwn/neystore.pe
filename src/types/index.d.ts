type Id = `${string}-${string}-${string}-${string}-${string}`;
export const PRODUCT_CATEGORY = {
  Toys: "Juguetes",
  Tecnology: "Tecnologia",
} as const;

type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];

export type ProductImage = {
  id: Id;
  thumb: string;
  url: string;
  width: number;
  height: number;
  public_id: string;
  format: string;
  type: "image";
  title: string;
};

export type ProductVideo = {
  id: Id;
  cover: string;
  url: string;
  title: string;
  width: number;
  height: number;
  public_id: string;
  format: string;
  type: "image";
};
export type Product = {
  id: Id;
  title: string;
  images: ProductImage[];
  features: string[] | null;
  details: Record<string, string> | null;
  video: ProductVideo | null;
  price: number;
  cost: number;
  ranking: number;
  category: ProductCategory;
  slug: string;
};

type ProductRaw = {
  title: string;
  details: Record<string, string> | null;
  features: string[];
  video: {
    url: string;
    cover: string;
    title: string;
  } | null;
  images: string[];
};
