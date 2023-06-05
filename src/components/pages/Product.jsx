import { LoadingOverlay } from "@mantine/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase";

const Product = () => {
  const { id } = useParams();
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

  return <div>{product?.name}</div>;
};

export default Product;
