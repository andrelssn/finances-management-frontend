import React, { useRef } from "react";
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
import { postData } from "../../Services/Services";

type RegisterForm = {
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
};

export default function Register({ setSnackbar }: AuthTypes) {
    const registerForm                    = useRef<RegisterForm>({ "email": "", "name": "", "password": "", "password_confirmation": "" });
    const [loader, setLoader]             = React.useState<boolean>(false);

    const navigate = useNavigate();

    async function registerUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoader(true);

        const uri = "/auth/register";

        const body = registerForm.current;

        if ( registerForm.current.password === registerForm.current.password_confirmation ) {
            const result = await postData({uri, body});

            if (result.success) {
                if (result.response.status === 200) {
                    setSnackbar({
                        open: true,
                        severity: "success",
                        message: `Registrado com sucesso!`,
                    });

                    registerForm.current = {
                        email: "",
                        name: "",
                        password: "",
                        password_confirmation: "",
                    };

                    navigate("/auth/login");
                }
            } else {
                const errors = result.response?.data?.errors;

                if (errors) {
                    const errorMessages: string[] = [];

                    if (errors.email?.includes("The email has already been taken.")) {
                        errorMessages.push("Erro ao registrar, Email já existe.");
                    }

                    if (errors.password?.includes("The password field must be at least 6 characters.")) {
                        errorMessages.push("Erro ao registrar, a senha precisa ter ao menos 6 caracteres.");
                    }

                    if (errors.email?.includes("The email field must be a valid email address.")) {
                        errorMessages.push("Erro ao registrar, insira um endereço de email válido.");
                    }

                    // dispara snackbar para todos os erros
                    errorMessages.forEach((msg) => {
                        setSnackbar({ open: true, severity: "error", message: msg });
                    });

                    if (errorMessages.length === 0) {
                        setSnackbar({
                            open: true,
                            severity: "error",
                            message: "Erro ao registrar, tente novamente mais tarde.",
                        });
                    }
                } else {
                    setSnackbar({
                        open: true,
                        severity: "error",
                        message: result.message ?? "Erro ao registrar, tente novamente.",
                    });
                }
            }
        } else {
            setSnackbar({ open: true, severity: "error", message: `As senhas precisam ser iguais, verifique e tente novamente.` })
        }

        setLoader(false);
    }

    return (
        <form onSubmit={registerUser}>
            <Paper className="register-paper">
                <Box sx={{ display: "flex", justifySelf: "center"}}>
                    <img alt="logo" src={logo} style={{ width: "200px" }}/>
                </Box>

                <Typography fontSize={18} className="text-glow-silver">
                    Registrar
                </Typography>

                <StyledTextField
                    required
                    size="small"
                    label="Nome"
                    defaultValue={registerForm.current.name}
                    onChange={(e) => registerForm.current.name = e.target.value}
                />

                <StyledTextField
                    required
                    size="small"
                    label="Email"
                    defaultValue={registerForm.current.email}
                    onChange={(e) => registerForm.current.email = e.target.value}
                />

                <Box>
                    <StyledTextField
                        required
                        size="small"
                        label="Senha"
                        type="password"
                        defaultValue={registerForm.current.password}
                        onChange={(e) => registerForm.current.password = e.target.value}
                    />

                    <Typography color="var(--text-secondary)" fontSize={12}>
                        Min. 6 caracteres
                    </Typography>
                </Box>

                <StyledTextField
                    required
                    size="small"
                    label="Confirmar Senha"
                    type="password"
                    onChange={(e) => registerForm.current.password_confirmation = e.target.value}
                />

                <Button type="submit" className="login-button">
                    { !loader ? "Registrar" : <CircularProgress size={25} sx={{ color: "#fff" }}/> }
                </Button>

                <Divider sx={{ borderColor: "var(--text-secondary)" }}/>

                <Link to={"/auth/login"}>
                    <Button className="register-button">
                        Ir Para Tela de Login
                    </Button>
                </Link>

                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Finance$. Todos os direitos reservados.
                </p>
            </Paper>
        </form>
    )
}