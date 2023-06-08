import { useEffect } from "react";
import { Box } from "@mantine/core";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supabase";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const Login = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) navigate("/")
  }, [user])

  return (
    <Box
      w="100%"
      h="100vh"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box w="100%" maw={480} mx="lg">
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{ theme: ThemeSupa }}
        />
      </Box>
    </Box>
  );
};

export default Login;
