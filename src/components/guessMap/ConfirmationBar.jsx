import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function ConfirmationBar({ onClickYes, showConfirmation, place }) {
    return (
        <AppBar
            position='static'
            color="secondary"
        >
            <Toolbar
                onClick={onClickYes}
            >
                <Typography variant="h6"
                    sx={{
                        flexGrow: 1,
                        textAlign: 'center'
                    }}>
                    {showConfirmation ?
                        "Confirm guess"
                        :
                        "Can you point " + place + " on the map?"
                    }
                </Typography>
                {showConfirmation ?
                    <IconButton
                        color="inherit">
                        <CheckIcon />
                    </IconButton>
                    : null
                }
            </Toolbar>
        </AppBar>
    )
}