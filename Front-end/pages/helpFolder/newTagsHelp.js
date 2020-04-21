import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Help from './help';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '16px',
    },
    title: {
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        fontSize: 'large',
        fontWeight: 'bold',
    },
    content: {
        marginRight: '4px',
    },
}));

export default function LogInHelp() {
    const classes = useStyles();

    return (
        <Help>
            <div className={classes.root}>
                <Typography className={classes.title}>New Tags</Typography>
                <Typography paragraph>
                    On our website, there are only a few default categories or tags. These include ...
                    In newer updates of Minecraft, there might be more categories added. 
                    You can recommend the new tags to us by contacting us directly through "Contact"
                    section.
                </Typography>
                <Typography paragraph>
                    Or if you are the creator of a work in Minecraft that no term, which our website 
                    provides, can fit you, you can follow the steps below to make a new tag: (We recommend
                    you to follow these steps instead of contacting us directly because we might need to look at your
                    creations to decide if this tag is valid or not) 
                </Typography>
                <Typography paragraph>
                    1.  
                </Typography>
            </div>
        </Help>
    );
}