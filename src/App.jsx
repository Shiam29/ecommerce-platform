import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppShell, MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import Product from "./pages/Product";
import CreateProductPage from "./pages/CreateProductPage";
import { AuthProvider } from "./contexts/AuthProvider";
import AppHeader from "./components/AppHeader";
import Login from "./pages/Login";
import MyProducts from "./pages/MyProducts";
import EditProductPage from "./pages/EditProductPage";
import { CartProvider } from "./contexts/CartProvider";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <CartProvider>
            <AppShell padding="md" header={<AppHeader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Product />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/my-products" element={<MyProducts />} />
                <Route path="/my-products/:id" element={<EditProductPage />} />
                <Route path="/create" element={<CreateProductPage />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AppShell>
          </CartProvider>
        </MantineProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
