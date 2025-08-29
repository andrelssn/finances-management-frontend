import React, { useRef } from "react";
import { Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";

// Style
import "./Style.css";

// Logo
import logo from "../../Images/finances.png";
import { StyledTextField } from "../../Components/StyledTextField/StyledTextField";
import { loginPostData, postData, SecurityManagement } from "../../Services/Services";
import type { SnackbarState } from "../../Components/MySnackbar/MySnackbar";
import { useNavigate } from "react-router-dom";

// Services
// import { loginPostData, postData, SecurityManagement } from "../../Services/services";

// Components
// import { StyledTextField } from "../../Components/StyledTextField/StyledTextField";

type RegisterForm = {
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
};

type LoginTypes = {
    reloadCheck: () => void;
    setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>;
};

export default function Login({ setSnackbar, reloadCheck }: LoginTypes) {
    const registerForm                    = useRef<RegisterForm>({ "email": "", "name": "", "password": "", "password_confirmation": "" });
    const [email, setEmail]               = React.useState<string>("");
    const [password, setPassword]         = React.useState<string>("");
    const [loader, setLoader]             = React.useState<boolean>(false);
    const [mode, setMode]                 = React.useState("login");
    const [key, setKey]                   = React.useState(1);

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
                    setMode("login");
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

        setKey(key + 1);
        setLoader(false);
    }

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

    if (mode === "register") {
        return (
            <form onSubmit={registerUser}>
                <Paper className="login-paper" key={key}>
                    <Box sx={{ display: "flex", justifySelf: "center"}}>
                        <img alt="logo" src={logo} style={{ width: "200px" }}/>
                    </Box>

                    <Typography variant="h6" color="var(--text-secondary)" fontWeight={"bold"}>
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

                        <Typography color="var(--text-secondary)" fontSize={12} mt={"-8px"}>
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

                    <Button onClick={() => { setMode("login"); setKey(key + 1); }} className="register-button">
                        Voltar
                    </Button>

                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Finance$. Todos os direitos reservados.
                    </p>
                </Paper>
            </form>
        )
    }

    if (mode === "login") {
        return (
            <form onSubmit={loginUser}>
                <Paper className="login-paper" key={key}>
                    <Box sx={{ display: "flex", flexDirection: "column", justifySelf: "center"}}>
                        <img alt="logo" src={logo} style={{ width: "200px" }}/>

                        <Typography fontSize={18} color="var(--text-secondary)" fontWeight={"bold"}>
                            Iniciar Sessão
                        </Typography>
                    </Box>

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

                    <Button onClick={() => { setMode("register"); setKey(key + 1); }} className="register-button">
                        Registrar
                    </Button>

                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Finance$. Todos os direitos reservados.
                    </p>
                </Paper>
            </form>
        );
    }
}