import { Box, Paper } from "@mui/material";

export default function Flag({ countryCode }) {
    return (
        <Paper elevation={1} >
            <Box
                component="img"
                src={"https://flagcdn.com/" + countryCode.toLowerCase() + ".svg"}
                alt="flag"
                maxWidth={'400px'}
                maxHeight="30vh"
                px={1}
                pt={1}
            />
        </Paper>
    )
}