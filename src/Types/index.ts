export type ErrorType = {
  error?: string;
};

export type CategoryType = {
  id?: number;
  name?: string;
  image?: string;
};

export type ProductType = {
  id?: number;
  category_id?: number;
  name?: string;
  price?: number;
  ingredients?: string;
  points?: number;
  image?: string;
};

export type CartItemType = {
  qtd: number;
  item: ProductType;
};