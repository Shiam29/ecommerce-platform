import {
  Card,
  LoadingOverlay,
  Badge,
  Text,
  Button,
  Image,
  Footer,
  Box,
  Center,
} from "@mantine/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import { useCart } from "../contexts/CartProvider";
import { supabase } from "../supabase";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // Fetch the product by id
  async function fetchProduct(id) {
    setLoading(true);
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setLoading(false);
        if (products.length !== 0) setProduct(products[0]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  if (loading) return <LoadingOverlay visible={loading} overlayBlur={2} />;

  if (!loading && !product) return <h2>No product found!</h2>;

  return (
    <>
      <Box
        key={product.id}
        maw={640}
        mx="auto"
        padding="lg"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image
          style={{ flex: 1 }}
          fit="cover"
          src={product.image_url}
          height={260}
          alt={product.name}
          shadow="xl"
          radius="md"
        />

        <div style={{ flex: 1, padding: 32 }}>
          <h1>{product?.name}</h1>

          <Badge color="green" variant="light" size="xl">
            ${product.price}.00
          </Badge>

          {product.description && (
            <Text mt={8} size="lg" color="dimmed">
              {product.description}
            </Text>
          )}
        </div>
      </Box>
      <Footer p="xl" display="flex" style={{ justifyContent: "flex-end" }}>
        <div>
          <AddToCartButton id={product.id} />
        </div>
      </Footer>
    </>
  );
};

export default Product;
