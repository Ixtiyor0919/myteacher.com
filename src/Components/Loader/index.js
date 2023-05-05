// material-ui
import {
    styled
} from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// loader style
const LoaderWrapper = styled('div')(({
    theme
}) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2001,
    width: '100%',
    '& > * + *': {
        marginTop: theme.spacing(2)
    }
}));

// const style = {
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: '100vh',
//     position: 'fixed',
// }
// const styleProgress = {
//     width: '50px',
//     height: '50px',
//     display: 'block',
//     margin: '280px auto 0 auto',
// }
// ==============================|| Loader ||============================== //

const Loader = () => ( 
    <LoaderWrapper>
        <LinearProgress color="primary" />
    </LoaderWrapper>
    // <Box sx={style}>
    //     <CircularProgress sx={styleProgress} />
    // </Box>
);

export default Loader;
