import React from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";

// Components
import CustomModal from "../../CustomModal/CustomModal";
import CustomButton from "../../CustomButton/CustomButton";

// Service
import { deleteData } from "../../../Services/services";

export default function DeleteModal(props) {
    const {
        itemDelete,
        open,
        handleClose,
        handleReloadFetch,
        setSnackbar
    } = props;

    const [loader, setLoader] = React.useState(false);

    async function handleDeleteItem() {
        setLoader(true);

        let uri = '';

        if (itemDelete.type === "monthly") {
            uri = `/monthly/${itemDelete.item.id}`;
        }

        await deleteData(uri).then(response => {
            if (response.status === 200 && response.data.status) {
                handleClose();
                handleReloadFetch();
                setSnackbar({ open: true, severity: "success", message: `Removido com sucesso.` })
            } else {
                setSnackbar({ open: true, severity: "error", message: `Houve um erro ao tentar remover, tente novamente mais tarde.` })
            }
        })

        setLoader(false);
    }

    return (
        <CustomModal open={open} onClose={handleClose}>
            <Box>
                <Typography textAlign={"center"} color="var(--text)" fontWeight={"bold"} mt={1}>
                    Tem certeza de que deseja remover o item selecionado?
                </Typography>

                <Divider sx={{ m: "20px 0px" }}/>

                <Box display={"flex"} justifyContent={"center"} m={"10px 20px"} gap={2}>
                    <CustomButton size="small" onClick={() => handleDeleteItem()} className="delete-button" sx={{ width: 150, fontSize: 12 }}>
                        { loader ? <CircularProgress size={14} color="#ffffff"/> : "Confirmar" }
                    </CustomButton>

                    <CustomButton size="small" onClick={() => handleClose()} className="cancel-button" sx={{ width: 150, fontSize: 12 }}>
                        Cancelar
                    </CustomButton>
                </Box>
            </Box>
        </CustomModal>
    )
}