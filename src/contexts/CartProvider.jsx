import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./AuthProvider";

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);

  // Fetch the product by id
  async function fetchProduct(id) {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        if (products.length !== 0) return products[0];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Fetch all products
  async function fetchProducts(cart) {
    const products = [];
    for (const id of cart.products) {
      const product = await fetchProduct(id);
      products.push(product);
    }
    return products;
  }

  // Fetch the users cart
  async function fetchCart() {
    try {
      const id = localStorage.getItem("cart_id");
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
        .select();

      if (error) {
        console.error("Error fetching carts:", error);
        return null;
      } else {
        if (carts.length === 0) return null;
        localStorage.setItem("cart_id", carts[0].id);
        return carts[0];
      }
    } catch (error) {
      return null;
    }
  }

  async function createOrFetchCart() {
    let cart = await fetchCart();
    if (!cart) cart = await createCart();
    setProducts(await fetchProducts(cart));
    setCart(cart);
  }

  useEffect(() => {
    createOrFetchCart();
  }, []);

  // Add item to cart
  async function addToCart(id) {
    if (!cart || !id) return;

    const { data: carts } = await supabase
      .from("carts")
      .update({ products: cart.products.concat(id) || [] })
      .eq("id", cart.id)
      .select();

    if (carts && carts.length > 0) {
      setProducts(await fetchProducts(carts[0]));
      return setCart(carts[0]);
    }
  }

  // Remove item from cart
  async function removeFromCart(id) {
    if (!cart) return;

    const { data: carts } = await supabase
      .from("carts")
      .update({
        products: cart.products.filter((product_id) => product_id !== id) || [],
      })
      .eq("id", cart.id)
      .select();

    if (carts && carts.length > 0) {
      setProducts(await fetchProducts(carts[0]));
      return setCart(carts[0]);
    }
  }

  // Reset cart
  async function resetCart() {
    localStorage.clear();
    createOrFetchCart();
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, resetCart, products }}
    >
      {children}
    </CartContext.Provider>
  );
};
