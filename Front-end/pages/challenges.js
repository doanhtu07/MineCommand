import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Link from '../src/Link';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper")
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
    paraG: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider: {
        marginBottom: '16px'
    },
    card: {
        width: '300px',
    },
    media: {
        height: '140px',
    },
    letter: {
        fontWeight: '600',
        fontSize: 'medium',
    },
    likeAndShareShow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: '8px'
    },
    likeAndShareButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#e3f2fd'
    },
    likeAndShareWords: {
        color: '#3f51b5',
    },
    subtitle1: {
        fontSize: 'smaller',
    },
    subtitle2: {
        fontSize: 'xx-small',
    },
    divideTitle: {
        marginBottom: '8px',
    },
}));

export default function Challenges() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <div className={classes.title}>
                <img height="64px" width="64px" src="https://cdn0.iconfinder.com/data/icons/business-aqua-vol-1/500/Challenge-512.png"/>
                <Typography className={classes.titleWord}>
                    Challenges
                </Typography>
                <img height="64px" width="64px" src="https://cdn1.iconfinder.com/data/icons/business-motivation-3/64/Success-winner-trophy-challenge-victory-512.png"/>
            </div>
            <Typography paragraph>
                Hi you all, we hope you are having a good day. In this section, we will introduce you to one of the
                two most important categories we have here at MineCommand which is "Challenges".
            </Typography>
            <Typography paragraph>
                "Challenges" are basically brand new questions and suggestions provided by both users and staff of
                our website. These questions and suggestions will orient around things such as:  
            </Typography>
            <Typography paragraph>
                <img height="36px" width="36px" src="https://cdn2.iconfinder.com/data/icons/minecraft-and-pixels/32/minecraft-21-512.png"/>
                Buildings and structures. You can see this as arranging furnitures or building something in the most realistic way
                or the most beautiful way.
            </Typography>
            <Typography paragraph>
                <img height="36px" width="36px" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c819a5d7-18f6-4ee1-9150-de2de2c2000a/dabr12y-1016df17-0722-42c6-b73a-fbd92a1a0f3d.png/v1/fill/w_894,h_894,strp/command_block_by_lanceberyl_dabr12y-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcL2M4MTlhNWQ3LTE4ZjYtNGVlMS05MTUwLWRlMmRlMmMyMDAwYVwvZGFicjEyeS0xMDE2ZGYxNy0wNzIyLTQyYzYtYjczYS1mYmQ5MmExYTBmM2QucG5nIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.iH6gCVVtP-qjrmJ8Z5x65qdDLMKkTGhPy89_KvOhOaU"/>
                Command Blocks (our website's main focus). These challenges will have you build machines using Command
                Blocks and make them work as closely to our requirements as possible. In this kind of challenges, we will rank
                the difficulties of all the problems for you, so don't worry ((: There will be easy to hard challenges. 
            </Typography>
            <Typography paragraph>
                <img height="36px" width="36px" src="http://www.minecraftopia.com/images/blocks/redstone_repeater.png"/>
                Redstones. For those of you who are not familiar with Command Blocks, Redstones challenges are a great
                alternative. These challenges are pretty much the same as Command Blocks ones as they are still ranked
                based on difficulties and still ask you to build machines which have functionalities as requirements.
            </Typography>
        </Paper>
    );
}