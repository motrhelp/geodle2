import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function ConfirmationBar({ onClickYes, onClickNo, showConfirmation, place }) {
    return (
        <AppBar
            position='static'
            color="secondary"
        >
            <Toolbar>
                {showConfirmation ?
                    <IconButton
                        color="inherit"
                        onClick={onClickNo}
                    >
                        <CloseIcon />
                    </IconButton>
                    : null
                }
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
                        color="inherit"
                        onClick={onClickYes}
                    >
                        <CheckIcon />
                    </IconButton>
                    : null
                }
            </Toolbar>
        </AppBar>
    )
}