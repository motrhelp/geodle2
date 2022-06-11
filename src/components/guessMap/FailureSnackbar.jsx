import { Alert, Snackbar } from "@mui/material";

export default function FailureSnackbar({ showFailure, setShowFailure }) {
    return (
        <Snackbar
            open={showFailure}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ marginTop: 10 }}
            onClose={() => setShowFailure(false)}
        >
            <Alert severity="error">
                Wrong! The arrow is a hint.
            </Alert>
        </Snackbar>
    )
}