import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper")
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
    },
    titleWord: {
        fontSize: 'x-large',
        fontWeight: '600',
    },
}));

export default function Challenges() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <div className={classes.title}>
                <img height="64px" width="64px" src="https://cdn1.iconfinder.com/data/icons/steaming-gaming/80/minecraft-block-crafting-256.png"/>
                <Typography className={classes.titleWord}>
                    Creations
                </Typography>
                <img height="64px" width="64px" src="https://cdn1.iconfinder.com/data/icons/steaming-gaming-1/80/minecraft-block-crafting-build-256.png"/>
            </div>
            <Typography paragraph>
                Welcome to MineCommand, we hope you guys are having a good day. In this section, we will show you what
                "Creations" means on our website. "Creations" is one of our most important categories.
            </Typography>
            <Typography paragraph>
                "Creations" generally includes all the creations made and posted by users. These creations are samples 
                that you can follow and rebuild in your own Minecraft world. There would be specific steps or tutorial videos which you can
                use to guide your restructing process.
            </Typography>
            <Typography paragraph>
                "Creations" covers 3 fields just the same as "Challenges":
            </Typography>
            <Typography paragraph>
                <img height="36px" width="36px" src="https://cdn2.iconfinder.com/data/icons/minecraft-and-pixels/32/minecraft-21-512.png"/>
                Buildings and structures. There are a lot of beautiful houses and ways to arrange furnitures that you can
                refer to in your world.
            </Typography>
            <Typography paragraph>
                <img height="36px" width="36px" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c819a5d7-18f6-4ee1-9150-de2de2c2000a/dabr12y-1016df17-0722-42c6-b73a-fbd92a1a0f3d.png/v1/fill/w_894,h_894,strp/command_block_by_lanceberyl_dabr12y-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcL2M4MTlhNWQ3LTE4ZjYtNGVlMS05MTUwLWRlMmRlMmMyMDAwYVwvZGFicjEyeS0xMDE2ZGYxNy0wNzIyLTQyYzYtYjczYS1mYmQ5MmExYTBmM2QucG5nIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.iH6gCVVtP-qjrmJ8Z5x65qdDLMKkTGhPy89_KvOhOaU"/>
                Command Blocks. A long list of machines working based on Command Blocks. They are really cool if you can rebuild
                in your world and see the process of them working.
            </Typography>
            <Typography paragraph>
                <img height="36px" width="36px" src="http://www.minecraftopia.com/images/blocks/redstone_repeater.png"/>
                Redstones. These creations are pretty much the same as Command Blocks ones. There are also steps which if you follow,
                you will have a modern Minecraft world with complicated piston machines working beautifully.   
            </Typography>
        </Paper>
    );
}