import { useState, useEffect } from "react";
import {
  Box,
  LoadingOverlay,
  TextInput,
  Textarea,
  NumberInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCurrencyDollar, IconPlus } from "@tabler/icons-react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useParams } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      image_url: "",
    },

    validate: {
      name: (value) => value.length === 0,
      price: (value) => value <= 0,
    },
  });

  // Redirect user to login if not logged in
  useEffect(() => {
    if (!user && !loading) navigate("/login");
  }, [user]);

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
        if (products.length !== 0) form.setValues(products[0]);
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

  const handleSubmit = async (values) => {
    if (!user) return alert("Please sign in to update product");
    if (user.id !== form.values.user_id)
      return alert("You can only edit your own products");

    const { error } = await supabase
      .from("products")
      .update({
        name: values.name,
        description: values.description,
        price: values.price,
        image_url: values.image_url,
        user_id: user.id,
      })
      .eq("id", id);

    if (error) return alert("Error occurred");
    return navigate(`/my-products`);
  };

  if (loading) return <LoadingOverlay visible={loading} overlayBlur={2} />;

  if (!loading && !form.values) return <h2>No product found!</h2>;

  return (
    <Box mx="auto" maw={720}>
      <form
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <h3>Edit Product</h3>

        <TextInput required label="Name" {...form.getInputProps("name")} />

        <Textarea label="Description" {...form.getInputProps("description")} />

        <NumberInput
          label="Price"
          defaultValue={0}
          type="number"
          icon={<IconCurrencyDollar />}
          {...form.getInputProps("price")}
        />

        <TextInput label="Image URL" {...form.getInputProps("image_url")} />

        <br />

        <Button type="submit" leftIcon={<IconPlus />}>
          Save
        </Button>
      </form>
    </Box>
  );
};

export default EditProductPage;
