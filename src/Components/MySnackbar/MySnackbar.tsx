import { Alert, Slide, Snackbar, type SlideProps } from "@mui/material";

export type SnackbarState = {
    open: boolean;
    severity?: "success" | "info" | "warning" | "error";
    message: string;
};

type MySnackbarProps = {
    open: boolean;
    snackbar: SnackbarState;
    setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>;
};

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

export default function MySnackbar({ open, snackbar, setSnackbar }: MySnackbarProps) {
    const handleClose = () => {
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            slots={{ transition: SlideTransition }}
            autoHideDuration={3200}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
        >
            <Alert
                onClose={handleClose}
                severity={snackbar.severity ?? "info"}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};