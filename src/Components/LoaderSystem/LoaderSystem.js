import { Box } from "@mui/material";

import "./Style.css";

export default function LoaderSystem(props) {
    return (
        <Box {...props}>
            <div className="loader"></div>
        </Box>
    );
}