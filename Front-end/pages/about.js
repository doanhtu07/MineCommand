import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper"),
        transition: theme.transitions.create(['background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: 425,
        }),
    },
    aboutUsFont: {
        fontSize: 'x-large',
        fontWeight: 'bold',
    },
    aboutBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    img: {
        height: 80,
        width: 'auto',
        marginBottom: 10
    },
}));

export default function About() {
    const classes = useStyles();

    return(
        <div>
            <Paper className={classes.root}>
                <div className={classes.aboutBox}>
                    <Typography className={classes.aboutUsFont}>
                        About Us
                    </Typography>
                    <img className={classes.img} src="/friends.gif"/>
                </div>
                <Divider/>
                <Divider/>
                <Typography paragraph/>
                <Typography paragraph> 
                    MineCommand is a website providing you tons of new challenges in Minecraft for both Creative and
                    Survival modes. You can also find and learn many creations made by other players or share your 
                    own ideas with the community.
                </Typography>
                <Typography paragraph>
                    Your ideas are really important to us. If you have any ideas of a creation or a challenge
                    in Minecraft, support us and help everyone have a fun time in Minecraft by sharing your ideas. By this way,
                    we can build strong MineCommand and Minecraft communities that provide players plenty of new ideas 
                    they can try out in their worlds.
                </Typography>
                <Typography paragraph>
                    Thank you for reading. We hope you will have a great time with Minecraft and especially MineCommand !!!
                </Typography>
            </Paper>
        </div>
    );
}