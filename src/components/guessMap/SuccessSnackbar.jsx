import { Alert, Snackbar } from "@mui/material";

export default function SuccessSnackbar({ showSuccess, place }) {
    return (
        <Snackbar
            open={showSuccess}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ marginTop: 10 }}
        >
            <Alert severity="success">
                Well done! You found {place}
            </Alert>
        </Snackbar>
    )
}