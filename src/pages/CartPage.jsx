import { ActionIcon, Avatar, Button, Card, Table, TextInput, Select, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowRight, IconTrash } from "@tabler/icons-react";
import { useCart } from "../contexts/CartProvider";
import BillingInfo from "../components/BillingInfo";
import { useState } from "react";
import Lottie from "lottie-react";
import animation from "../res/checkmark.json";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [checkedOut, setCheckedOut] = useState(false);
  const { products, resetCart } = useCart();
  const form = useForm({
    initialValues: {
      street: "",
      suburb: "",
      state: "",
      country: "Australia",
      cardholderName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },

    validate: {
      street: (value) => value.length === 0 ? "Please enter a street address" : null,
      suburb: (value) => value.length === 0 ? "Please enter a suburb" : null,
      state: (value) => value.length === 0 ? "Please enter a state or territory" : null,
      cardholderName: (value) => value.length === 0 ? "Please enter a cardholdername" : null,
      cardNumber: (value) => value.length !== 16 ? "Invalid card number" : null,
      expiry: (value) => value.length !== 5 ? "Invalid expiry date" : null,
      cvc: (value) => value.length !== 3 ? "Invalid cvc" : null,
    },
  });
  
  const total = products?.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  function handleCheckout() {
    setCheckedOut(true);
    resetCart();
  }

  if (checkedOut)
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <Lottie
          loop={false}
          animationData={animation}
          style={{ width: 256, margin: "auto" }}
        />

        <h1>Order complete!</h1>
        <p>Our team will contact you with delivery information.</p>

        <Link to={"/"}>
          <Button>Return home</Button>
        </Link>
      </div>
    );

  return (
    <form className="container" onSubmit={form.onSubmit(handleCheckout)}>
      <h1>Your cart</h1>
      <br />
      <Card shadow="xl">
        <Table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </tbody>
        </Table>
        {products?.length === 0 && (
          <p style={{ textAlign: "center" }}>Your cart is empty!</p>
        )}
      </Card>

      <br />

      <div>
        <h1>Billing Info</h1>
        <br />
        <Card shadow="xl">
          <p style={{ marginTop: 0 }}>Delivery Address</p>
          <TextInput label="Street" style={{ flex: 1 }} {...form.getInputProps("street")}/>

          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <TextInput label="Suburb" style={{ flex: 0.7 }}{...form.getInputProps("suburb")} />

            <Select
              withinPortal
              label="State"
              data={[
                "ACT",
                "New South Wales",
                "Victoria",
                "Northern Territory",
                "Western Australia",
                "Tasmania",
              ]}
              style={{ flex: 0.3 }}
            />
            
            <Select
              label="Country"
              value={"Australia"}
              data={["Australia"]}
              disabled
              style={{ flex: 0.3 }}
            />
          </div>

          <Divider style={{ margin: 32 }} />

          <p style={{ marginTop: 0 }}>Payment</p>

          <TextInput label="Cardholder name" {...form.getInputProps("cardholderName")} />
          <TextInput
            type="number"
            label="Card number"
            style={{ marginTop: 8 }}
          />
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <TextInput
              label="Expiry"
              style={{ flex: 1 }}
              {...form.getInputProps("expiry")}
            />
            <TextInput label="CVC" style={{ flex: 1 }} {...form.getInputProps("cvc")}/>
          </div>
        </Card>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 32,
          gap: 16,
        }}
      >
        <h2>Total: ${total}.00</h2>

        <Button
          disabled={products?.length === 0}
          rightIcon={<IconArrowRight />}
          style={{ float: "right" }}
          type="submit"
        >
          Pay now
        </Button>
      </div>
    </form>
  );
};

const CartItem = ({ product }) => {
  const { removeFromCart } = useCart();

  return (
    <tr>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar src={product.image_url} shadow="sm" />
          <p>{product.name}</p>
        </div>
      </td>
      <td>${product.price}</td>
      <td>
        <ActionIcon onClick={() => removeFromCart(product.id)} color="red">
          <IconTrash size={16} />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default CartPage;
