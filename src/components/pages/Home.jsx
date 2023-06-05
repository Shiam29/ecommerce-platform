import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*");

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

  return (
    <div className="container">
      <div className="product-row">
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

            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="auto"
              radius="md"
            >
              Add to cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
