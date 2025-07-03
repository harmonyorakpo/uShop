import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem, IProduct } from '@models/product.model';

@Injectable({
  providedIn: 'root'
})
export class Cart {

private readonly STORAGE_KEY = 'cart-items';
  
  // Private signal to store cart items
  private cartItems = signal<CartItem[]>(this.loadFromStorage());
  
  // Public readonly signals
  public readonly items = this.cartItems.asReadonly();
  public readonly itemCount = computed(() => 
    this.cartItems().reduce((total, item) => total + item.cartQuantity, 0)
  );
  public readonly totalPrice = computed(() => 
    this.cartItems().reduce((total, item) => total + (item.price * item.cartQuantity), 0)
  );

  constructor() {
    // Auto-save to localStorage whenever cart changes
    effect(() => {
      this.saveToStorage(this.cartItems());
    });
  }

  addToCart(product: IProduct, quantity: number = 1): void {
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        cartQuantity: updatedItems[existingItemIndex].cartQuantity + quantity
      };
      this.cartItems.set(updatedItems);
    } else {
      // Add new item to cart
      const newCartItem: CartItem = {
        ...product,
        cartQuantity: quantity
      };
      this.cartItems.set([...currentItems, newCartItem]);
    }
  }

  removeFromCart(productId: number): void {
    const updatedItems = this.cartItems().filter(item => item.id !== productId);
    this.cartItems.set(updatedItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItems();
    const updatedItems = currentItems.map(item => 
      item.id === productId 
        ? { ...item, cartQuantity: quantity }
        : item
    );
    this.cartItems.set(updatedItems);
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  // Get a specific item from cart
  getCartItem(productId: number): CartItem | undefined {
    return this.cartItems().find(item => item.id === productId);
  }

  // Check if product is in cart
  isInCart(productId: number): boolean {
    return this.cartItems().some(item => item.id === productId);
  }

  // Get quantity of specific product in cart
  getProductQuantityInCart(productId: number): number {
    const item = this.getCartItem(productId);
    return item ? item.cartQuantity : 0;
  }

  private loadFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }

  private saveToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }
}
