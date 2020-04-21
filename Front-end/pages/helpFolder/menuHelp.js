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

export default function menuHelp() {
    const classes = useStyles();

    return (
        <Help>
            <div className={classes.root}>
                <Typography className={classes.title}>Menu</Typography>
                <Typography paragraph>
                    The menu aids you in finding resources on our website faster. There are recently
                    7 sections in the menu: Home, Challenges, Creations, Search List, About, Contact, Help. 
                </Typography>
                <Typography paragraph>
                    You can freely check those sections out to understand our website better. If you have any troubles
                    during your expedition on MineCommand, you can always go back to this Help page, or you
                    can contact us through Contact page by leaving your comments there. Your feedbacks and questions
                    are really important for us. 
                </Typography>
            </div>
        </Help>
    );
}