import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExtensionRoundedIcon from '@material-ui/icons/ExtensionRounded';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper"),
        transition: theme.transitions.create(['background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: 425,
        }),
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
    },
    titleWord: {
        fontSize: 'x-large',
        fontWeight: '600',
    },
    img: {
        height: 50,
        width: 50,
        marginRight: 10
    },
}));

export default function Challenges() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <div className={classes.title}>
                <ExtensionRoundedIcon/>
                <Typography className={classes.titleWord}>
                    Challenges
                </Typography>
                <ExtensionRoundedIcon/>
            </div>
            <Typography paragraph>
                Hi you all, we hope you are having a good day. In this section, we will introduce you to one of the
                two most important types we have here at MineCommand which is "Challenges".
            </Typography>
            <Typography paragraph>
                "Challenges" are basically brand new questions and suggestions provided by both users and staff of
                our website. These questions and suggestions will orient around things such as:  
            </Typography>
            <Typography paragraph>
                <img className={classes.img} src="/pickaxe.gif"/>
                Buildings and structures. You can see this as arranging furnitures or building something in the most realistic way
                or the most beautiful way.
            </Typography>
            <Typography paragraph>
                <img className={classes.img} src="/commandblock.gif"/>
                Command Blocks (our website's main focus). These challenges will have you build machines using Command
                Blocks and make them work as closely to our requirements as possible. In this kind of challenges, we will rank
                the difficulties of all the problems for you, so don't worry! There will be easy to hard challenges. 
            </Typography>
            <Typography paragraph>
                <img className={classes.img} src="/redstone.gif"/>
                Redstones. For those of you who are not familiar with Command Blocks, Redstones challenges are a great
                alternative. These challenges are pretty much the same as Command Blocks ones as they are still ranked
                based on difficulties and still ask you to build machines which have functionalities as requirements.
            </Typography>
        </Paper>
    );
}