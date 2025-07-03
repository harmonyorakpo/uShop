export interface IProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  description: string;
  image: string;
}

export interface ProductResponse {
  statusCode: number;
  products: IProduct[];
}

export interface checkoutData {
  quantity: number;
  product_id: number
}

export interface CartItem extends IProduct {
  cartQuantity: number;
}

export interface CheckoutItem {
  name: string;
  quantity: number;
  price: number;
  description: string;
  image: string;
  id: number;
  total_price: number;
}

export interface CheckoutData {
  total_price: number;
  items: CheckoutItem[];
}

export interface CheckoutResponse {
  statusCode: number;
  checkout: CheckoutData;
}