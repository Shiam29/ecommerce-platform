import { Button } from "@mantine/core";
import { useCart } from "../contexts/CartProvider";

const AddToCartButton = ({ id }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (ev) => {
    ev.stopPropagation();
    addToCart(id);
  };

  return (
    <Button
      variant="light"
      color="blue"
      fullWidth
      mt="auto"
      radius="md"
      onClick={(ev) => handleAddToCart(ev)}
    >
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
