import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuHelp from './menuHelp';
import Link from '../../src/Link';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper")
    },
    helpFont: {
        fontSize: 'x-large',
        fontWeight: 'bold',
    },
    listHelp: {
        marginTop: '16px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'front-start',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function Help(props) {
    const classes = useStyles();

    if(!props.children) return <MenuHelp/>;

    return (
        <Paper className={classes.root}>
            <Typography className={classes.helpFont}>
                Help
            </Typography>
            <Divider/>
            <Divider/>
            <div className={classes.listHelp}>
                <Button className={classes.title} color="primary" component={Link} href="/helpFolder/menuHelp">
                    Menu
                </Button>
                <Button className={classes.title} color="primary" component={Link} href="/helpFolder/newTagsHelp">
                    New Tags
                </Button>
            </div>
            <Divider/>
            <Divider/>
            {props.children}
        </Paper>
    );
}
