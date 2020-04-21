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
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper")
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
                    <div>
                        <img height= "70px" width="70px" src="https://cdn2.iconfinder.com/data/icons/endless-summer/775/palm_tree_beach-512.png"/>
                        <img height= "50px" width="50px" src="https://cdn4.iconfinder.com/data/icons/creative-team/92/iconN146-15-512.png"/>
                    </div>
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
                    Get yourself used to the Search List in the Menu section as it would help you a lot in searching for 
                    what you need.
                </Typography>
                <Typography paragraph>
                    One more thing... Your ideas are really important to us. If you have any ideas of a creation or a challenge
                    in Minecraft, support us and help everyone have a fun time in Minecraft by sharing your ideas. By this way,
                    we can build a strong MineCommand community that provides users plenty of ideas anytime they need. 
                </Typography>
                <Typography paragraph>
                    Thank you for reading. We hope you will have a great time with MineCommand !!!
                </Typography>
            </Paper>
        </div>
    );
}