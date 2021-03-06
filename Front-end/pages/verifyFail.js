import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Link from '../src/Link';
import login from '../public/login.jpg';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        backgroundImage: `url(${login})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
    },
    div: {
        backgroundColor: theme.palette.loginLayer.main,
        position: 'absolute',
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3, 2),
        backgroundColor: theme.palette.paper.loginLight,
        height: '480px',
        width: '400px',
        position: 'absolute',
        left: 'calc((100% - 432px) / 2)',
        top: 'calc((100% - 504px) / 2)',
    },
    largeFont: {
        fontSize: 'xx-large',
        fontWeight: 'bold',
        marginTop: '8px',
        color: theme.palette.error.main,
    },
    next: {
        marginTop: '16px',
        padding: theme.spacing(2),
        minHeight: '40px',
        background: theme.palette.barButton.main,
        '&:hover': {
            opacity: 0.85
        },
    },
    icon: {
        color: theme.palette.error.main,
        height: '100px',
        width: 'auto'
    },
    smallFont: {
        fontSize: 'large',
        fontWeight: 'bold',
        marginTop: '8px',
        color: theme.palette.error.main,
    },
}));

export default function LogIn() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.div}/>
            <Paper className={classes.paper}>
                <Typography className={classes.largeFont}>
                    Verify Fail!
                </Typography>
                <ErrorOutlineRoundedIcon className={classes.icon}/>
                <Typography className={classes.smallFont}>
                    Your verification token is expired or not found.
                </Typography>
                <Button className={classes.next} component={Link} href="/login">
                    Go to Login page.
                </Button>
            </Paper>
        </div>
    );
}