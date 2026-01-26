interface Product {
  subcategory: Array<{
    _id: string;
    name: string;
    slug: string;
    category: string;
  }>;
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  id: string;
  quantity?: number;
}

interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface Order {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: CartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface OrdersResponse {
  data: Order[];
  success: boolean;
  message: string;
}
