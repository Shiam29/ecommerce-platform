import { ActionIcon, Avatar, Table } from "@mantine/core";
import { supabase } from "../supabase";
import { IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";
import { useState } from "react";
import { useCart } from "../contexts/CartProvider";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className="container">
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart?.products.map((id) => (
            <CartItem key={id} id={id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const CartItem = ({ id }) => {
  const { removeFromCart } = useCart();
  const [product, setProduct] = useState(null);

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
        if (products.length !== 0) setProduct(products[0]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);

  if (!product) return <></>;

  return (
    <tr>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar src={product.image_url} shadow="sm" />
          <p>{product.name}</p>
        </div>
      </td>
      <td>${product.price}</td>
      <td>1</td>
      <td>
        <ActionIcon onClick={() => removeFromCart(id)} color="red">
          <IconTrash size={16} />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default CartPage;
