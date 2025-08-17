import React from "react";
import { Box, Button, CircularProgress, Divider, Paper, Typography } from "@mui/material";

// Style
import "./Style.css";

// Logo
import logo from "../../Images/FinancesLogo.png";

// Services
import { loginPostData, postData, SecurityManagement } from "../../Services/services";

// Components
import { StyledTextField } from "../../Components/StyledTextField/StyledTextField";

export default function Login(props) {
    const [registerForm, setRegisterForm] = React.useState({ "email": "", "name": "", "password": "", "password_confirmation": "" })
    const [email, setEmail]               = React.useState("");
    const [password, setPassword]         = React.useState(null);
    const [loader, setLoader]             = React.useState(false);
    const [mode, setMode]                 = React.useState("login");
    const [key, setKey]                   = React.useState(1);

    async function registerUser(e) {
        e.preventDefault();
        setLoader(true);

        let uri = "/auth/register";

        let body = registerForm;

        if ( registerForm.password === registerForm.password_confirmation ) {
            await postData({uri, body}).then(response => {
                if (response.status === 200) {
                    props.setReload(props.reload + 1);
                    props.setSnackbar({ open: true, severity: "success", message: `Registrado com sucesso!` });

                    setRegisterForm({ "email": "", "name": "", "password": "", "password_confirmation": "" });
                    setMode("login");
                } else {
                    props.setSnackbar({ open: true, severity: "error", message: `Erro ao registrar, tente novamente mais tarde.` })

                    if ( response.data.errors?.email?.includes("The email has already been taken.") ) {
                        props.setSnackbar({ open: true, severity: "error", message: `Erro ao registrar, Email já existe.` })
                    }

                    if ( response.data.errors?.password?.includes("The password field must be at least 6 characters.") ) {
                        props.setSnackbar({ open: true, severity: "error", message: `Erro ao registrar, a senha precisa ter ao menos 6 caracteres.` })
                    }

                    if ( response.data.errors?.email?.includes("The email field must be a valid email address.") ) {
                        props.setSnackbar({ open: true, severity: "error", message: `Erro ao registrar, insira um endereço de email válido.` })
                    }

                };
            });
        } else {
            props.setSnackbar({ open: true, severity: "error", message: `As senhas precisam ser iguais, verifique e tente novamente.` })
        }

        setKey(key + 1);
        setLoader(false);
    }

    async function loginUser(e) {
        e.preventDefault();
        setLoader(true);

        let uri = "/auth/login";

        let body = {
            "email": email,
            "password": password
        };

        await loginPostData({uri, body}).then(response => {
            if (response.status === 200) {
                if (SecurityManagement(response)) {
                    props.setReload(props.reload + 1);
                    props.setSnackbar({ open: true, severity: "success", message: `Seja bem-vindo!` })
                } else {
                    props.setSnackbar({ open: true, severity: "error", message: `Ocorreu um erro ao autenticar sessão` })
                };
            } else {
                props.setSnackbar({ open: true, severity: "error", message: `Ocorreu um erro ao autenticar, verifique as credenciais e tente novamente` })
            }
        });

        setPassword(null);
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
                        defaultValue={registerForm.name}
                        onChange={(e) => registerForm.name = e.target.value}
                    />

                    <StyledTextField
                        required
                        size="small"
                        label="Email"
                        defaultValue={registerForm.email}
                        onChange={(e) => registerForm.email = e.target.value}
                    />

                    <Box>
                        <StyledTextField
                            required
                            size="small"
                            label="Senha"
                            type="password"
                            defaultValue={registerForm.password}
                            onChange={(e) => registerForm.password = e.target.value}
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
                        onChange={(e) => registerForm.password_confirmation = e.target.value}
                    />

                    <Button type="submit" className="login-button">
                        { !loader ? "Registrar" : <CircularProgress size={25} sx={{ color: "#fff" }}/> }
                    </Button>

                    <Divider sx={{ borderColor: "var(--text-secondary)" }}/>

                    <Button onClick={() => setMode("login")} className="register-button">
                        Voltar
                    </Button>
                </Paper>
            </form>
        )
    }

    if (mode === "login") {
        return (
            <form onSubmit={loginUser}>
                <Paper className="login-paper" key={key}>
                    <Box sx={{ display: "flex", justifySelf: "center"}}>
                        <img alt="logo" src={logo} style={{ width: "200px" }}/>
                    </Box>

                    <Typography variant="h6" color="var(--text-secondary)" fontWeight={"bold"}>
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

                    <Button onClick={() => setMode("register")} className="register-button">
                        Registrar
                    </Button>
                </Paper>
            </form>
        );
    }
}