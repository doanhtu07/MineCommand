import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import BrushRoundedIcon from '@material-ui/icons/BrushRounded';

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
        marginBottom: '16px',
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
                <BuildRoundedIcon/>
                <Typography className={classes.titleWord}>
                    Creations
                </Typography>
                <BrushRoundedIcon/>
            </div>
            <Typography paragraph>
                Welcome to MineCommand, we hope you guys are having a good day. In this section, we will show you what
                "Creations" means on our website. "Creations" is one of our most important types.
            </Typography>
            <Typography paragraph>
                "Creations" generally includes all the creations made and posted by users. These creations are samples 
                that you can follow and rebuild in your own Minecraft world. There would be specific steps or tutorial 
                videos which you can use to guide your restructing process.
            </Typography>
            <Typography paragraph>
                "Creations" covers 3 sub types just the same as "Challenges":
            </Typography>
            <Typography paragraph>
                <img className={classes.img} src="/pickaxe.gif"/>
                Buildings and structures. There are a lot of beautiful houses and ways to arrange furnitures that you can
                refer to in your world.
            </Typography>
            <Typography paragraph>
                <img className={classes.img} src="/commandblock.gif"/>
                Command Blocks. A long list of machines working based on Command Blocks. They are really cool if you can rebuild
                in your world and see the process of them working.
            </Typography>
            <Typography paragraph>
                <img className={classes.img} src="/redstone.gif"/>
                Redstones. These creations are pretty much the same as Command Blocks ones. There are also steps which if you follow,
                you will have a modern Minecraft world with complicated piston machines working beautifully.   
            </Typography>
        </Paper>
    );
}