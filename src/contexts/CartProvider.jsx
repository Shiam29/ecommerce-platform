import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./AuthProvider";

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  // Fetch the users cart
  async function fetchCart() {
    try {
      const id = localStorage.getItem('cart_id');
      if (!id) return null;

      const { data: carts, error } = await supabase
        .from("carts")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error fetching carts:", error);
        return null;
      } else {
        if (carts.length !== 0) return carts[0];
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  // Create a cart
  async function createCart() {
    try {
      const { data: carts, error } = await supabase
        .from("carts")
        .insert({ products: [] })
        .select()
        

      if (error) {
        console.error("Error fetching carts:", error);
        return null;
      } else {
        if (carts.length === 0) return null;
        localStorage.setItem('cart_id', carts[0].id)
        return cart;
      }
    } catch (error) {
      return null;
    }
  }

  async function createOrFetchCart() {
    let cart = await fetchCart();
    if (!cart) cart = await createCart();
    setCart(cart);
  }

  useEffect(() => {
    createOrFetchCart();
  }, []);

  // Add item to cart
  async function addToCart(id) {
    if (!cart || !id) return;
    // If product already exists in cart
    if (cart.products.includes(id)) return;

    const { data: carts } = await supabase
      .from('carts')
      .update({ products: cart.products.concat(id) || [] })
      .eq('id', cart.id)
      .select()

      if (carts && carts.length > 0) return setCart(carts[0])
    }

  // Remove item from cart
  async function removeFromCart(id) {
    if (!cart) return;

    const { data: carts } = await supabase
      .from('carts')
      .update({ products: cart.products.filter(product_id => product_id !== id) || [] })
      .eq('id', cart.id)
      .select()

    if (carts && carts.length > 0) return setCart(carts[0])
  }
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
