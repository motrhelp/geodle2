import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function TopBar({ victory, title, previousLevel, nextLevel }) {

    const onClickRefresh = () => {
        window.location.reload(false);
    };

    return (
        <AppBar position="static">
            <Toolbar >
                {previousLevel ?
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={previousLevel}
                    >
                        <ArrowBackIos />
                    </IconButton>
                    : null
                }

                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'end', paddingRight: 2 }}>
                    GEODLE
                </Typography>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title ?
                        title :
                        "Level 1"
                    }
                </Typography>

                {victory ?
                    <IconButton
                        color='inherit'
                        onClick={onClickRefresh}
                    >
                        <RefreshIcon />
                    </IconButton>
                    : null
                }

                {victory ?
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={nextLevel}
                    >
                        <ArrowForwardIos />
                    </IconButton>
                    : null
                }
            </Toolbar>
        </AppBar>
    )
}