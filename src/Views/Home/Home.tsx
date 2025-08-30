import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import logo from '../../Images/finances.png';

import './Style.css';

export default function Home() {
    return (
        <main className="relative flex mt-20 items-center justify-center">
            <article className="panel text-center flex flex-col gap-5 w-3/4">
                <Typography
                    fontSize={{ xs: 28, sm: 38 }}
                    fontWeight="bolder"
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        flexDirection: { xs: "column", sm: "row" }
                    }}
                >
                    <span className="text-glow">Bem-vindo ao</span>
                    <img
                        src={logo}
                        alt="finance$"
                        width={180}
                        style={{ marginBottom: 3, maxWidth: "100%", height: "auto" }}
                    />
                </Typography>

                <p className="text-lg text-[var(--text)]">
                    O seu aliado para organizar melhor as finanças, entender seus gastos e conquistar
                    mais tranquilidade financeira.
                </p>

                <p className="text-md text-[var(--text-secondary)]">
                    Registre-se agora ou faça login para começar a gerenciar seu dinheiro de forma prática e inteligente.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={'/auth/register'}>
                        <Button className="theme-button">
                            Criar Conta
                        </Button>
                    </Link>

                    <Link to={'/auth/login'}>
                        <Button className="light-button">
                            Fazer Login
                        </Button>
                    </Link>
                </div>

                <footer className="text-xs text-slate-500 pt-4">
                    Controle seus gastos. Invista no seu futuro. Comece hoje.
                </footer>
            </article>
        </main>
    )
}