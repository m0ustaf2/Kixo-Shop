import { IPagination } from "./pagination.interface";

export interface IProductResponse {
  results: number;
  metadata: IPagination;
  data: IProduct[];
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number | null | undefined;
  imageCover: string;
  images: string[];
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  subcategory: Array<{
    _id: string;
    name: string;
    slug: string;
    category: string;
  }>;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  quantity: number;
  sold: number;
  availableColors: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}
