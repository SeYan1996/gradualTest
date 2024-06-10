import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Paper, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/user.gql";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({
        variables: { userLoginInput: { userName } },
      });
      // 登录成功后将用户信息保存在上下文中
      if (login && data) {
        login({
          _id: data.userLogin._id,
          userName: data.userLogin.userName as string,
          avatar: data.userLogin.avatar || "",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "32px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome !
        </Typography>
        <TextField
          label="Enter your username"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Login
        </Button>
      </Paper>
    </div>
  );
};
