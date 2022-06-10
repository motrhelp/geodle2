import { East, North, NorthEast, NorthWest, South, SouthEast, SouthWest, West } from "@mui/icons-material";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';


export default function Guesses({ guesses }) {
    const bearingIcons = [<East />, <SouthEast />, <South />, <SouthWest />,
    <West />, <NorthWest />, <North />, <NorthEast />, <East />];

    function getBearingIcon(bearing, distance) {
        if (distance > 0) {
            return bearingIcons[Math.round(bearing / 45)];
        } else {
            return <CheckIcon />
        }
    }

    return (
        <List
            sx={{
                flexGrow: 1,
                overflow: 'auto'
            }}
            dense
        >
            {guesses.map((guess, index) =>
                <ListItem key={index}>
                    <ListItemAvatar>
                        {getBearingIcon(guess.bearing, guess.distance)}
                    </ListItemAvatar>
                    <ListItemAvatar>
                        <Box
                            component={"img"}
                            src={"https://flagcdn.com/20x15/" + guess.code.toLowerCase() + ".png"}
                            alt="guessFlagIcon"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        sx={{ display: 'inline' }}
                        primary={guess.name}
                        primaryTypographyProps={{
                            variant: 'subtitle',
                        }}
                        secondary={guess.distance + " km"}
                    >
                    </ListItemText>
                </ListItem>
            )}
        </List>
    );
}