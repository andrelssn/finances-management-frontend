import { Button } from "@mui/material";

// Styles
import "./Style.css";

export default function CustomButton(props) {
    return (
        <Button {...props}>
            {props.children}
        </Button>
    )
}