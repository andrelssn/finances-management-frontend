import { Alert, Slide, Snackbar } from "@mui/material";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function MySnackbar(props) {
    const handleClose = () => {
        props.setSnackbar({
            ...props.snackbar,
            open: false,
        });
    };

    return (
        <Snackbar
            open={props.open}
            onClose={handleClose}
            slots={{ transition: SlideTransition }}
            autoHideDuration={3200}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
        >
            <Alert
                onClose={handleClose}
                severity={props.snackbar.severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {props.snackbar.message}
            </Alert>
        </Snackbar>
    );
};