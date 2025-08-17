import styled from "styled-components";
import TextField from "@mui/material/TextField";

export const StyledTextField = styled(TextField)`
    && {
        margin: 8px 0;
        width: 30vh;

        .MuiInputBase-root {
            background-color: #eeeeeeff;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            color: var(--text);
        }

        .MuiOutlinedInput-notchedOutline {
            border-color: #ccc;
        }

        &:hover .MuiOutlinedInput-notchedOutline {
            border-color: var(--theme-dark);
        }

        .Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: var(--theme);
        }

        .MuiInputLabel-root {
            color: var(--text-secondary);
            font-weight: bold;
            font-size: 16px;
        }

        .MuiInputLabel-root.Mui-focused {
            color: var(--theme);
        }
    }
`;
