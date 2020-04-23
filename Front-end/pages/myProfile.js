import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserProvider from '../contexts/UserProvider.js';

const styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper"),
        height: '100%',
        width: '100%'
    },
    image: {
        width: 170,
        height: 170,
        borderRadius: '50%',
        marginBottom: 10
    },
    avatarGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    name: {
        fontSize: 'x-large',
        fontWeight: 'bold'
    },
    gridContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    divider: {
        display: 'flex',
        width: '50%',
        marginBottom: 10,
        alignItems: 'center'
    },
});

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        this.setState({ user: this.context.user });
    }

    componentDidUpdate() {
        if(!_.isEqual(this.state.user, this.context.user)) 
            this.setState({ user: this.context.user });
    }

    render() {
        const { classes } = this.props; 

        return (
            <Paper className={classes.root}>
                <Grid container spacing={2} direction="column">
                    <Grid item xs className={classes.avatarGrid}>
                        {
                            this.state.user.avatarUrl &&
                            <img className={classes.image} src={this.state.user.avatarUrl} />
                        }
                        {   
                            !this.state.user.avatarUrl &&
                            <AccountCircleIcon className={classes.image}/>
                        }
                        <Typography variant="button" className={classes.name}>
                            {this.state.user.name}
                        </Typography>
                        <Divider className={classes.divider} />
                    </Grid>
                    <Grid item xs>
                        <Typography variant="button">
                            Your uploaded posts:
                        </Typography>

                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

MyProfile.contextType = UserProvider.context;

export default withStyles(styles)(MyProfile);