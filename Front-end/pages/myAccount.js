import React, { Component, createContext } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Router from 'next/router';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UserProvider from '../contexts/UserProvider.js';
import NormalField from '../components/AccountSetting/normalField.js';
import NormalEditField from '../components/AccountSetting/normalEditField.js';
import ConfirmEditField from '../components/AccountSetting/confirmEditAccountField.js';
import AvatarEdit from '../components/AccountSetting/avatarEdit.js';

const styles = theme => ({
    paper: {
        padding: theme.spacing(4),
        margin: 'auto',
        backgroundColor: theme.getColor("paper"),
        width: '-webkit-fill-available'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 'xx-large'
    },
    title2: {
        fontWeight: 'bold',
        fontSize: 'x-large'
    },
    titleGrid: {
        flexGrow: 0
    },
});

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

class MyAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                password: "",
                avatarUrl: null,
            },

            snackBar: false,
            snackBarTitle: "",

            name: "",
            password: "",
            confirmPassword: "",

            hoverName: false,
            editName: false,
            noteName: "",

            hoverPassword: false,
            editPassword: false,
            notePassword: "",
            showPassword: false,

            hoverAvatar: false,
            backDropAvatar: false,
        };
    }

    //snackbar
    openSnackBar = (title) => {
        this.setState({
            snackBar: true,
            snackBarTitle: title
        });
    }
    closeSnackBar = () => {
        this.setState({
            snackBar: false,
            snackBarTitle: ""
        });
    }

    //name
    mouseEnterName = () => {
        this.setState({ hoverName: true });
    }
    mouseLeaveName = () => {
        this.setState({ hoverName: false });
    }
    clickEditName = () => {
        this.setState({ 
            editName: true,
            name: this.state.user.name 
        });
    }
    keyDownName = (event) => {
        if(event.key==="Enter") 
            this.saveName();
    }
    closeEditName = () => {
        this.setState({ 
            editName: false,
            name: "",
            noteName: "",
        });
    }
    changeName = (event) => {
        this.setState({ name: event.target.value });
    }
    saveName = () => {
        if(this.state.name===this.state.user.name) 
            this.setState({ noteName: "This name is the same as your old name." });
        else if(this.state.name==="") 
            this.setState({ noteName: "You should not use empty name."});
        else {
            axios.put('/api/userData/update', {
                type: "name",
                name: this.state.name,
                id: this.state.user.id
            })
            .then(res => {
                this.context.forceReloadPage();

                this.openSnackBar("name");
                this.closeEditName();
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    //password
    mouseEnterPassword = () => {
        this.setState({ hoverPassword: true });
    }
    mouseLeavePassword = () => {
        this.setState({ hoverPassword: false });
    }
    clickEditPassword = () => {
        this.setState({ 
            editPassword: true,
            password: this.state.user.password
        });
    }
    keyDownPassword = (event) => {
        if(event.key==="Enter") 
            this.savePassword();
    }
    closeEditPassword = () => {
        this.setState({ 
            editPassword: false,
            password: "",
            confirmPassword: "",
            notePassword: "",
            showPassword: false
        });
    }
    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }
    changeConfirmPassword = () => {
        this.setState({ confirmPassword: event.target.value });
    }
    savePassword = () => {
        if(this.state.password===this.state.user.password) 
            this.setState({ notePassword: "This password is the same as your old one." });
        else if(this.state.password==="") 
            this.setState({ notePassword: "You should not use empty password."});
        else if(this.state.password!==this.state.confirmPassword)
            this.setState({ notePassword: "Your confirmation is different from your password."});
        else {
            axios.put('/api/userData/update', {
                type: "password",
                password: this.state.password,
                id: this.state.user.id
            })
            .then(res => {
                this.context.forceReloadPage();

                this.openSnackBar("password");
                this.closeEditPassword();
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    clickVisiblePassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }
    mouseDownPassword = (event) => {
        event.preventDefault();
    }

    //avatar
    mouseEnterAvatar = () => {
        this.setState({ hoverAvatar: true });
    }
    mouseLeaveAvatar = () => {
        this.setState({ hoverAvatar: false });
    }
    openAvatarBackDrop = () => {
        this.setState({ backDropAvatar: true });
    }
    closeAvatarBackDrop = () => {
        this.setState({ backDropAvatar: false });
    }

    componentCheck = () => {
        if (!_.isEmpty(this.context.user)) {
            if(!_.isEqual(this.state.user, this.context.user))
                this.setState({ 
                    user: this.context.user,
                });
        }

        else {
            Router.push('/');
        }
    }

    componentDidMount() {
        this.componentCheck();
    }

    componentDidUpdate(prevProps) {
        this.componentCheck();
    }

    render() {
        const { classes } = this.props;
        const { user } = this.state;

        return (
            <Grid container spacing={3} direction="column">
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Grid container spacing={4}>
                            <AvatarEdit 
                                mouseEnter={this.mouseEnterAvatar}
                                mouseLeave={this.mouseLeaveAvatar}
                                openBackDrop={this.openAvatarBackDrop}
                                hover={this.state.hoverAvatar}
                                backDrop={this.state.backDropAvatar}
                                closeBackDrop={this.closeAvatarBackDrop}
                            />
                            <Grid item xs={12} container direction="column" spacing={2}>
                                <Grid className={classes.titleGrid} item xs>
                                    <Typography className={classes.title} variant="subtitle1">
                                        My Account
                                    </Typography>
                                </Grid>
                                <Grid item xs container direction="column" spacing={4}>
                                    <Grid item xs container direction="row" spacing={4}>
                                        <NormalEditField 
                                            title="Name"
                                            MouseEnter={this.mouseEnterName}
                                            MouseLeave={this.mouseLeaveName}
                                            edit={this.state.editName}
                                            user={user.name}
                                            state={this.state.name}
                                            change={this.changeName}
                                            clickEdit={this.clickEditName}
                                            closeEdit={this.closeEditName}
                                            keyDown={this.keyDownName}
                                            note={this.state.noteName}
                                            hover={this.state.hoverName}
                                            save={this.saveName}
                                        />
                                        <NormalField title="Email" value={user.email}/>
                                    </Grid>
                                    <Grid item xs container direction="row" spacing={4}>
                                        <ConfirmEditField 
                                            title="Password"
                                            MouseEnter={this.mouseEnterPassword}
                                            MouseLeave={this.mouseLeavePassword}
                                            show={this.state.showPassword}
                                            edit={this.state.editPassword}
                                            user={user.password}
                                            state={this.state.password}
                                            change={this.changePassword}
                                            clickEdit={this.clickEditPassword}
                                            keyDown={this.keyDownPassword}
                                            note={this.state.notePassword}
                                            hover={this.state.hoverPassword}
                                            clickVisible={this.clickVisiblePassword}
                                            mouseDown={this.mouseDownPassword}
                                            changeConfirm={this.changeConfirmPassword}
                                            closeEdit={this.closeEditPassword}
                                            stateConfirm={this.state.confirmPassword}
                                            save={this.savePassword}
                                        />
                                    </Grid>
                                    <Grid container spacing={4} direction="row" item xs>
                                        <NormalField title="Created At" value={String(user.createdAt).substring(0, 10)}/>
                                        <NormalField title="Updated At" value={String(user.updatedAt).substring(0, 10)}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    key={'bottom,right'}
                    open={this.state.snackBar}
                    onClose={this.closeSnackBar}
                >
                    <Alert onClose={this.closeSnackBar} severity="success">
                        Successfully change {this.state.snackBarTitle}
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }
}

MyAccount.contextType = UserProvider.context;

export default withStyles(styles)(MyAccount);