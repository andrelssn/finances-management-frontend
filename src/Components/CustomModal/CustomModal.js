import { Box, Modal } from "@mui/material";

// Styles
import "./Style.css";

export default function CustomModal(props) {
    return (
        <Modal {...props}>
            <Box className="modal-style">
                {props.children}
            </Box>
        </Modal>
    )
}