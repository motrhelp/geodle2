import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import PublicIcon from '@mui/icons-material/Public';
import ShareIcon from '@mui/icons-material/Share';

export default function BottomBar() {
    return (
        <AppBar position='static'
            sx={{ top: 'auto', bottom: 0 }}
            color="secondary"
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                >
                    <PublicIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{
                    flexGrow: 1,
                    textAlign: 'center'
                }}>
                    VICTORY
                </Typography>
                <IconButton
                    color="inherit">
                    <ShareIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}