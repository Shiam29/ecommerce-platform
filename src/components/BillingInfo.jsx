import { Card, Divider, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

const BillingInfo = () => {
  const form = useForm({
    initialValues: {
      street: "",
      suburb: "",
      state: "",
      country: "",
      cardholderName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },

    validate: {
      street: (value) => value.length === 0,
    },
  });

  const [expiry, setExpiry] = useState("");

  const handleExpiryChange = (event) => {
    const expiryValue = event.target.value.replace(/\D/g, "").match(/.{1,2}/g);
    if (expiryValue?.length > 2) return;
    return setExpiry(expiryValue?.join("/") || "");
  };

  return (
    <div>
      <h1>Billing Info</h1>
      <br />
      <Card shadow="xl">
        <p style={{ marginTop: 0 }}>Delivery Address</p>
        <TextInput label="Street" style={{ flex: 1 }} />

        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          <TextInput label="Suburb" style={{ flex: 0.7 }} />
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

        <TextInput label="Cardholder name" />
        <TextInput type="number" label="Card number" style={{ marginTop: 8 }} />
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          <TextInput
            label="Expiry"
            value={expiry}
            onChange={handleExpiryChange}
            style={{ flex: 1 }}
          />
          <TextInput label="CVC" style={{ flex: 1 }} />
        </div>
      </Card>
    </div>
  );
};

export default BillingInfo;
