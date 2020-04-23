import React, { useContext } from 'react';
import axios from 'axios';
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
        height: '480px',
        width: '400px',
        position: 'absolute',
        left: 'calc((100% - 432px) / 2)',
        top: 'calc((100% - 504px) / 2)',
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
}));

export default function LogIn() {
    const { loginUser } = useContext(UserProvider.context);

    const classes = useStyles();

    const [email, setEmail] = React.useState("");
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const [password, setPassword] = React.useState("");
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const [error, setError] = React.useState("");

    const handleSubmit = () => {
        if(email==="" || password==="") 
            setError('Either email or password is missing.');
        else
            loginUser('local', { email, password })
            .catch(e => {
                setError(e);
            });
    };

    const handleFacebook = () => {
        loginUser('facebook')
    };

    const handleKeyDown = (event) => {
        if(event.key==='Enter')
            handleSubmit();
    };

    return (
        <div className={classes.root}>
            <div className={classes.div}/>
            <Paper className={classes.paper} onKeyDown={handleKeyDown}>
                <Typography className={classes.largeFont}>
                    Log In
                </Typography>
                {
                    error==='Incorrect email.' &&
                    <TextField
                        className={classes.textfield}
                        error
                        id="error-password"
                        label="Email"
                        defaultValue={email}
                        helperText={error}
                        variant="filled"
                        onChange={handleEmail}
                    />
                }
                {
                    error!=='Incorrect email.' &&
                    <TextField
                        className={classes.textfield}
                        id="email"
                        label="Email"
                        variant="filled"
                        onChange={handleEmail}
                    />
                }
                {
                    error==='Incorrect password.' &&
                    <TextField
                        className={classes.textfield}
                        error
                        id="error-password"
                        label="Password"
                        type="password"
                        defaultValue={password}
                        helperText={error}
                        variant="filled"
                        onChange={handlePassword}
                    /> 
                }
                {
                    error!=='Incorrect password.' &&
                    <TextField
                        className={classes.textfield}
                        id="password"
                        label="Password"
                        type="password"
                        variant="filled"
                        autoComplete="current-password"
                        onChange={handlePassword}
                    />
                }
                {
                    error==='Either email or password is missing.' &&
                    <Typography className={classes.error}>
                        Error: {error}
                    </Typography>
                }
                <Button className={classes.next} onClick={handleSubmit}>
                    Submit
                </Button>
                <Typography className={classes.smallFont}>
                    Don't have an account yet?
                    <Typography className={classes.link} component={Link} href='/signup'> 
                        Sign Up
                    </Typography>
                </Typography>
                <Typography className={classes.smallFont}>
                    Forget your password?
                    {/* <Link>
                        Recover password
                    </Link> */}
                </Typography>
                <Typography className={classes.smallFont}>
                    Or Log In with Facebook or Google:
                </Typography>
                <div className={classes.images}>
                    <Button 
                        onClick={handleFacebook}
                        classes={{
                            root: classes.buttonLabel
                        }}
                    >
                        <img 
                            src="/facebook.png"
                            className={classes.image}
                        />
                    </Button>
                    <Button classes={{
                        root: classes.buttonLabel,
                    }}>
                        <img 
                            src="/google.png"
                            className={classes.image}
                        />
                    </Button>
                </div>
            </Paper>
        </div>
    );
}
