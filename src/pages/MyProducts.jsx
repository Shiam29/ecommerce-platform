import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { useAuth } from "../contexts/AuthProvider";
import { IconPlus } from "@tabler/icons-react";

const MyProducts = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [user]);

  async function fetchProducts() {
    try {
      if (!user) return;

      const { data: products, error } = await supabase
        .from("products")
        .select()
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const handleClick = (id) => {
    // Navigate to /:id
    navigate(`/${id}`);
  };

  const handleEdit = (ev, id) => {
    // Navigate to /my-products/:id
    ev.stopPropagation();
    navigate(`/my-products/${id}`);
  };

  const handleDelete = async (ev, id) => {
    ev.stopPropagation();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) return alert(error);
    return fetchProducts();
  };

  return (
    <div className="container">
      <h1>My Products</h1>
      <br />
      <div className="product-row">
        {products.length === 0 && (
          <div>
            <p>No products yet!</p>

            <Link to="/create">
              <Button leftIcon={<IconPlus />}>Create Product</Button>
            </Link>
          </div>
        )}
        {products.map((product) => (
          <Card
            key={product.id}
            maw={300}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="product-card"
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(product.id)}
          >
            <Card.Section>
              <Image
                fit="contain"
                src={product.image_url}
                height={160}
                alt={product.name}
              />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{product.name}</Text>
              <Badge color="green" variant="light" size="xl">
                ${product.price}.00
              </Badge>
            </Group>

            <Text
              style={{
                height: 48,
                overflow: "hidden",
                marginBottom: 10,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
              size="sm"
              color="dimmed"
            >
              {product.description}
            </Text>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="auto"
                radius="md"
                onClick={(ev) => handleEdit(ev, product.id)}
              >
                Edit
              </Button>

              <Button
                variant="light"
                color="red"
                fullWidth
                mt="auto"
                radius="md"
                onClick={(ev) => handleDelete(ev, product.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
