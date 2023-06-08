import { useState, useEffect } from "react";
import { Box, TextInput, Textarea, NumberInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCurrencyDollar, IconPlus } from "@tabler/icons-react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const CreateProductPage = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth();
  
  // Redirect user to login if not logged in
  useEffect(() => {
    if (!user && !loading) navigate('/login')
  }, [user])

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

  const handleSubmit = async (values) => {
    if (!user) return alert("Please sign in to create product")

    const { error } = await supabase
      .from("products")
      .insert({ 
        name: values.name, 
        description: values.description,
        price: values.price, 
        image_url: values.image_url,
        user_id: user.id
    });

    if (error) return alert("Error occurred")
    return navigate("/");
  };

  return (
    <Box mx="auto" maw={720}>
      <form
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <h3>Create Product</h3>

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
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateProductPage;
