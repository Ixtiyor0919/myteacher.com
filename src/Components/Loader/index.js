import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
    const style = {
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
        position: 'fixed',
    }
    const styleProgress = {
        width: '50px',
        height: '50px',
        display: 'block',
        margin: '280px auto 0 auto',
    }
    return(
        <Box sx={style}>
            <CircularProgress sx={styleProgress} />
        </Box>
    )
};

export default Loader;