import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { AppShell, Header } from "@mantine/core";
import { ActionIcon } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import CreateProductPage from "./components/pages/CreateProductPage";

function App() {
  return (
    <div>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell
          padding="md"
          header={
            <Header display="flex" style={{ justifyContent: "space-between" }} height={60} p="md">
              <h3 style={{ marginTop: -1 }}>E-commerce Platform</h3>
              <ActionIcon color="violet" variant="light">
                <IconShoppingCart size="1.125rem" />
              </ActionIcon>
            </Header>
          }
        >
          {
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Product />} />
                <Route path="/create" element={<CreateProductPage />} />
              </Routes>
            </BrowserRouter>
          }
        </AppShell>
      </MantineProvider>
    </div>
  );
}

export default App;
