export interface Branch {
  id: string,
  name: string
}

export interface Product {
  id: number,
  price: number,
  name: string
}

export interface CartItem {
  productId: number,
  quantity: number
}