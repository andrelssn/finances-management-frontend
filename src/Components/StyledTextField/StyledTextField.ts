import styled from "styled-components";
import TextField from "@mui/material/TextField";

export const StyledTextField = styled(TextField)`
    && {
        margin: 8px 0;
        width: 100%;

        .MuiInputBase-root {
            background-color: var(--input-bg);
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            color: var(--text);
        }

        .MuiOutlinedInput-notchedOutline {
            border-color: var(--input-border);
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
