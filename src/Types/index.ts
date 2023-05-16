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

export type UserType = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
};

export type EnderecoType = {
  id?: number;
  endereco?: string;
  numero?: string;
  complemento?: string;
  cep?: string;
  cidade?: string;
  bairro?: string;
  uf?: string;
};