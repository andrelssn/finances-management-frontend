import React from "react";
import { Box, Button, CircularProgress, Divider, IconButton, Typography } from "@mui/material";

// Icons
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

// Components
import CustomModal from "../../../Components/CustomModal/CustomModal";
import { StyledTextField } from "../../../Components/StyledTextField/StyledTextField";

// Services
import { putData } from "../../../Services/services";

export default function ModalProfile(props) {
    const {
        openModal,
        handleCloseModal,
        userData,
        setReload,
        setSnackbar
    } = props;

    const [editName, setEditName] = React.useState(false);
    const [newName, setNewName]    = React.useState(userData.name);
    const [loader, setLoader]      = React.useState(false);

    async function sendEditName() {
        setLoader(true);

        let uri = `/user/name/${userData.id}`;

        let body = {
            'name': newName
        };

        await putData({uri, body}).then(response => {
            if (response.status === 200 && response.data.status) {
                setSnackbar({ open: true, severity: "success", message: `Nome de usuário atualizado com sucesso!` });
                setReload(Math.random());
            }
        });

        setLoader(false);
    }

    return (
        <CustomModal open={openModal} onClose={handleCloseModal}>
            <Typography color="var(--text)" fontWeight={"bold"}>
                Meu Perfil
            </Typography>

            <Divider/>

            <Box display={"flex"} alignItems={"center"} mt={2}>
                <StyledTextField
                    disabled={!editName ? true : false}
                    label="Nome"
                    size="small"
                    defaultValue={userData.name}
                    onChange={(e) => setNewName(e.target.value)}
                />

                <IconButton size="small" onClick={() => setEditName(!editName)} sx={{ ml: 1 }}>
                    { !editName ? <EditIcon sx={{ fontSize: 21 }}/> : <CloseIcon sx={{ fontSize: 21 }}/>}
                </IconButton>
            </Box>

            <Divider sx={{ mb: 3 }}/>

            <Box sx={{ position: "absolute", right: 20, bottom: 5 }}>
                <Button disabled={!editName ? true : false} size="small" color="var(--text)" onClick={() => sendEditName()}>
                    { loader ? <CircularProgress size={20}/> : "Salvar" }
                </Button>

                <Button size="small" color="var(--text)" onClick={() => handleCloseModal()}>
                    Fechar
                </Button>
            </Box>
        </CustomModal>
    )
}