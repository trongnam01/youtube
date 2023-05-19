/* eslint-disable react/prop-types */
import React from 'react';
// import { Backdrop, CircularProgress } from '@material-ui/core';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles((theme) => ({
//     backdrop: {
//         zIndex: theme.zIndex.drawer + 1,
//         color: '#fff',
//     },
// }));
const Loading = (props) => {
    const { isLoading } = props;
    // const classes = useStyles();
    return (
        <div>
            {/* <Backdrop
                open={isLoading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                // className={classes.backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop> */}

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default Loading;
