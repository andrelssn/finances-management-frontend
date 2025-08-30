import type { SnackbarState } from "../MySnackbar/MySnackbar";

export type AuthTypes = {
    reloadCheck: () => void;
    setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>;
};