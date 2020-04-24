import React, { useContext } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Link from '../src/Link';
import login from '../public/login.jpg';
import UserProvider from '../contexts/UserProvider.js';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        backgroundImage: `url(${login})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
    },
    div: {
        backgroundColor: theme.palette.loginLayer.main,
        position: 'absolute',
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3, 2),
        backgroundColor: theme.palette.paper.loginLight,
        height: '520px',
        width: '480px',
        position: 'absolute',
        left: 'calc((100% - 512px) / 2)',
        top: 'calc((100% - 568px) / 2)',
    },
    images: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: '8px',
        marginBottom: '8px',
    },
    buttonLabel: {
        marginRight: '8px',
        marginLeft: '8px',
        minWidth: '50px',
        minHeight: '50px',
        padding: '0px 0px',
    },
    smallFont: {
        fontSize: 'small',
        marginTop: '16px',
    },
    largeFont: {
        fontSize: 'x-large',
        fontWeight: 'bold',
        marginTop: '8px'
    },
    highlight: {
        fontWeight: 'bold',
        marginRight: '4px',
    },
    textfield: {
        marginTop: '16px'
    },
    next: {
        marginTop: '16px',
        padding: theme.spacing(1),
        minHeight: '40px',
        background: theme.palette.barButton.main,
        '&:hover': {
            opacity: 0.85
        },
    },
    image: {
        borderRadius: '5px',
        height: "50px",
        width: "50px" 
    },
    link: {
        marginLeft: '8px'
    },
    error: {
        marginTop: '16px',
        color: theme.palette.error.main
    },
    hide: {
        display: 'none'
    },
    section: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        marginBottom: 5
    },
}));

export default function ForgotPassword() {
    const { 
        changePassword, 
        sendPasswordVerificationCode, 
        checkVerificationCode 
    } = useContext(UserProvider.context);

    const classes = useStyles();

    const [allowCode, setAllowCode] = React.useState(false);
    const [allowPassword, setAllowPassword] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const [code, setCode] = React.useState("");
    const handleCode = (event) => {
        setCode(event.target.value);
    };

    const [password, setPassword] = React.useState("");
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const [confirm, setConfirm] = React.useState("");
    const handleConfirm = (event) => {
        setConfirm(event.target.value);
    };

    const [error, setError] = React.useState("");

    const handleSubmitEmail = () => {
        if(email==="") 
            setError("You are missing email field.");
        else {
            axios.get('/api/userData/findUserByEmail', {
                params: {
                    email,
                }
            })
            .then(() => {
                sendPasswordVerificationCode(email);
                setAllowCode(true);
                setError("");
            })
            .catch(err => {
                setError(err.response.data);
            })
        }
    }

    const handleSubmitCode = () => {
        if(code==="")
            setError("You are missing code field.");
        else {
            checkVerificationCode(code)
            .then(() => {
                setAllowPassword(true);
                setError("");
            })
            .catch(err => {
                setError(err);
            })
        }
    }

    const handleSubmitPassword = () => {
        if(password==="" || confirm==="")
            setError("You are missing one of the password fields.");
        else if(password!==confirm) 
            setError("Your confirmation password does not match your password.");
        else
            changePassword(password, email)
            .then(() => {
                Router.push('/login');
            })
            .catch(err => {
                console.log(err);
            })
    }

    const keyDownEmail = (event) => {
        if(event.key==="Enter") 
            handleSubmitEmail();
    }

    const keyDownCode = (event) => {
        if(event.key==="Enter")
            handleSubmitCode();
    }

    const keyDownPassword = (event) => {
        if(event.key==="Enter")
            handleSubmitPassword();
    }

    return (
        <div className={classes.root}>
            <div className={classes.div}/>
            <Paper className={classes.paper}> 
                <Typography className={classes.largeFont}>
                    Change Password
                </Typography>
                <div className={classes.section}>
                    <TextField 
                        className={classes.textfield}
                        id="email"
                        label="Email"
                        variant="filled"
                        onChange={handleEmail}
                        onKeyDown={keyDownEmail}
                    />
                    <Button 
                        className={clsx(classes.next, {
                            [classes.hide]: allowPassword
                        })} 
                        onClick={handleSubmitEmail}
                    >
                        Send Code (again)
                    </Button>
                </div>
                <div className={clsx({
                    [classes.hide]: !allowCode,
                    [classes.section]: allowCode
                })}>
                    <TextField
                        className={classes.textfield}
                        id="code"
                        label="Verification Code"
                        variant="filled"
                        onChange={handleCode}
                        onKeyDown={keyDownCode}
                    />
                    <Button 
                        className={clsx(classes.next, {
                            [classes.hide]: allowPassword
                        })} 
                        onClick={handleSubmitCode}
                    >
                        Next
                    </Button>
                </div>
                <div className={clsx({
                    [classes.hide]: !allowPassword,
                    [classes.section]: allowPassword
                })}>
                    <TextField
                        className={classes.textfield}
                        id="password"
                        label="New Password"
                        type="password"
                        variant="filled"
                        onChange={handlePassword}
                        onKeyDown={keyDownPassword}
                    />
                    <TextField
                        className={classes.textfield}
                        id="confirm"
                        label="Confirm Password"
                        type="password"
                        variant="filled"
                        onChange={handleConfirm}
                        onKeyDown={keyDownPassword}
                    />
                    <Button 
                        className={classes.next}
                        onClick={handleSubmitPassword}
                    >
                        Submit
                    </Button>
                </div>
                {
                    error!=="" &&
                    <Typography className={classes.error}>
                        Note: {error}
                    </Typography>
                }
                <Typography className={classes.smallFont}>
                    Go back to Login
                    <Typography className={classes.link} component={Link} href='/login'>
                        Log In
                    </Typography>
                </Typography>
                <Typography className={classes.smallFont}>
                    Don't have an account yet?
                    <Typography className={classes.link} component={Link} href='/signup'> 
                        Sign Up
                    </Typography>
                </Typography>
            </Paper>
        </div>
    );
}
