import {
  IconShoppingCart,
  IconPlus,
  IconList,
  IconPower,
} from "@tabler/icons-react";
import {
  Button,
  ActionIcon,
  Header,
  Avatar,
  Menu,
  Indicator,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { supabase } from "../supabase";
import CreateProductPage from "../pages/CreateProductPage";
import { useCart } from "../contexts/CartProvider";
import logoSrc from "../res/Logo.png";

const AppHeader = () => {
  const { user } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <Header
      display="flex"
      style={{ justifyContent: "space-between" }}
      height={60}
      p="md"
    >
      <Link to="/">
        <img style={{ height: "100%" }} src={logoSrc}/>
      </Link>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link to="/cart">
          <Indicator color="red" disabled={cart?.products?.length === 0}>
            <ActionIcon color="green" variant="light">
              <IconShoppingCart size="1.125rem" />
            </ActionIcon>
          </Indicator>
        </Link>

        {user ? (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar color="cyan" radius="xl">
                {user.email[0]}
              </Avatar>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>{user?.email}</Menu.Label>

              <Link to="/create">
                <Menu.Item icon={<IconPlus size={14} />}>
                  Create product
                </Menu.Item>
              </Link>

              <Link to="/my-products">
                <Menu.Item icon={<IconList size={14} />}>
                  View my products
                </Menu.Item>
              </Link>

              <Menu.Item
                color="red"
                icon={<IconPower size={14} />}
                onClick={handleLogout}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Link to="/login">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
