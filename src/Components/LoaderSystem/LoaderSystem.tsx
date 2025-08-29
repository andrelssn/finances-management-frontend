import { Box } from "@mui/material";
import type { BoxProps } from "@mui/system";

import "./Style.css";

export default function LoaderSystem(props: BoxProps) {
    return (
        <Box {...props}>
            <div className="loader"></div>
        </Box>
    );
}