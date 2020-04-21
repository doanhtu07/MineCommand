import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper")
    },
    title: {
        fontSize: 'x-large',
        fontWeight: 'bold',
    },
}));

export default function Contact() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography paragraph className={classes.title}>
                Contact Us
            </Typography>
        </Paper>
    );
}