import React from "react";
import { Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

// Style
import "./Style.css";

// Logo
import logo from "../../Images/finances.png";

// Components
import { StyledTextField } from "../../Components/StyledTextField/StyledTextField";
import type { AuthTypes } from "../../Components/Types/Types";

// Services
import { loginPostData, SecurityManagement } from "../../Services/Services";

export default function Login({ setSnackbar, reloadCheck }: AuthTypes) {
    const [email, setEmail]               = React.useState<string>("");
    const [password, setPassword]         = React.useState<string>("");
    const [loader, setLoader]             = React.useState<boolean>(false);
    const [key, setKey]                   = React.useState(1);

    const navigate = useNavigate();

    async function loginUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoader(true);

        const uri = "/auth/login";

        const body = {
            "email": email,
            "password": password
        };

        const result = await loginPostData({uri, body});

        if (result.success) {
            if (result.response.status === 200) {
                if (SecurityManagement(result.response)) {
                    reloadCheck();
                    navigate("/");
                    setSnackbar({ open: true, severity: "success", message: `Seja bem-vindo!` });
                } else {
                    setSnackbar({ open: true, severity: "error", message: `Ocorreu um erro ao autenticar sessão` });
                }
            } else {
                setSnackbar({ open: true, severity: "error", message: `Ocorreu um erro ao autenticar, verifique as credenciais e tente novamente` });
            }
        } else {
            setSnackbar({ open: true, severity: "error", message: `Ocorreu um erro no sistema, tente novamente mais tarde` });
        }

        setPassword("");
        setKey(key + 1);
        setLoader(false);
    }

    return (
        <form onSubmit={loginUser}>
            <Paper className="login-paper" key={key}>
                <Box sx={{ display: "flex", justifySelf: "center"}}>
                    <img alt="logo" src={logo} style={{ width: "200px" }}/>
                </Box>

                <Typography fontSize={18} className="text-glow-silver">
                    Iniciar Sessão
                </Typography>

                <StyledTextField
                    required
                    size="small"
                    label="Email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <StyledTextField
                    required
                    size="small"
                    label="Senha"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" className="login-button">
                    { !loader ? "Logar" : <CircularProgress size={25} sx={{ color: "#fff" }}/> }
                </Button>

                <Divider
                    sx={{
                        "&::before, &::after": {
                            borderColor: "var(--text-secondary)",
                        },
                        color: "var(--text-secondary)",
                        fontWeight: "bold"
                    }}
                >
                    Ou
                </Divider>

                <Link to={"/auth/register"}>
                    <Button className="register-button">
                        Registrar
                    </Button>
                </Link>

                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Finance$. Todos os direitos reservados.
                </p>
            </Paper>
        </form>
    );
}