import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Branch, Product, CartItem } from '../models/product.interface';

@Injectable()
export class StockItemService {

  branches: Branch[] = [
    { "id": "A123", "name": "SLO Headquarters" },
    { "id": "B456", "name": "SLO Satellite Office" }
  ]
  products: Product[] = [
    { "id": 1, "price": 2349.99, "name": "Microsoft Surface Pro" },
    { "id": 2, "price": 16.99, "name": "SoCreate Beanie" },
    { "id": 3, "price": 20.00, "name": "Lincoln Market Deli Gift Card" },
    { "id": 4, "price": 1799.99, "name": "Onewheel+" },
    { "id": 5, "price": 199.99, "name": "Sonos One Smart Speaker" }
  ]
  cartItems: CartItem[] = []

  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getBranchExists(id: string): Observable<boolean> {
    return of(this.branches.some(b => b.id === id));
  }
}