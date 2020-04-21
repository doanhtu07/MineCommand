import React, { useContext } from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import Link from '../src/Link';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EmojiEventsRoundedIcon from '@material-ui/icons/EmojiEventsRounded';
import BrushRoundedIcon from '@material-ui/icons/BrushRounded';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
import HeadsetMicRoundedIcon from '@material-ui/icons/HeadsetMicRounded';
import LiveHelpRoundedIcon from '@material-ui/icons/LiveHelpRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import sand from '../public/sand.jpg';
import bush from '../public/bush.png';
import day from '../public/day.png';
import night from '../public/night.jpg';
import UserProvider from '../contexts/UserProvider.js';
import { Scrollbars } from 'react-custom-scrollbars';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.6em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
          color: theme.getColor("paper"),
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.type==='light'? 'rgba(48, 48, 45, 0.6)':'rgba(255, 255, 255,.6)',
          outline: '2px solid slategrey',
          borderRadius: '5px'
        }
    },
    news: {
        padding: theme.spacing(3, 2),
    },
    layout: {
        flexGrow: 1,
    },
    toolBarBackGroundLight: {
        backgroundImage: `url(${sand})`,
        backgroundSize: '115px',
        transition: theme.transitions.create('background-image', {
            easing: theme.transitions.easing.easeInOut,
            duration: 425,
        }),
    },
    toolBarBackGroundDark: {
        backgroundImage: `url(${bush})`,
        backgroundSize: '115px',
        transition: theme.transitions.create('background-image', {
            easing: theme.transitions.easing.easeInOut,
            duration: 425,
        }),
    },
    marginL: {
        marginLeft: '8px',
    },
    titleOfList: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: "16px",
        paddingLeft: "16px",
        marginTop: "16px",
    },
    informationSect: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        background: theme.palette.barButton.main,
        '&:hover': {
            opacity: 0.85
        },
    },
    title: {
        display: 'flex',
        alignItems: 'center',
    },
    rootToolBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        fontSize: 'xx-large',
        fill: theme.getColor("primary")
    },
    leftDiv: {
        display: 'flex',
        justifyContent: 'flex-start',
        minWidth: '200px',
        alignItems: 'center'
    },
    rightDiv: {
        display: 'flex',
        justifyContent: 'flex-end',
        minWidth: '200px',
        alignItems: 'center'
    },
    search: {
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: '8px',
        display: 'flex',
        alignItems: 'center'
    },
    searchButton: {
        minHeight: '56px'
    },
    loginRoot: {
        padding: '0px 8px',
        minHeight: '40px',
        background: theme.palette.barButton.main,
        '&:hover': {
            opacity: 0.85
        },
    },
    loginText: {
        color: theme.palette.common.white,
    },
    MineCommand: {
        position: 'absolute',
        top: '2px',
        left: 'calc((100% - 400px) / 2)',
    },
    torch: {
        '&:hover': {
            cursor: 'pointer'
        },
    },
    searchIcon: {
        color: theme.palette.common.white
    },
    avatar: {
        '&:hover': {
            cursor: 'pointer'
        },
        backgroundColor: theme.palette.avatar.main,
        color: theme.palette.common.white
    },


    //drawer css: below
    root: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '-webkit-fill-available'
    },
    contentMain: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: theme.spacing(3)
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: theme.getColor("menuPaper")
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: '65px',
        backgroundColor: theme.getColor("menuPaper")
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    contentLight: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundImage: `url(${day})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        transition: theme.transitions.create('background-image', {
            easing: theme.transitions.easing.easeInOut,
            duration: 425,
        }),
    },
    contentDark: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundImage: `url(${night})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        transition: theme.transitions.create('background-image', {
            easing: theme.transitions.easing.easeInOut,
            duration: 425,
        }),
    },  
    divider: {
        height: '130px'
    },
}));

//styled components
const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));
  
const StyledMenuItem = withStyles((theme) => ({
root: {
    '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
        },
    },
},
}))(MenuItem);

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};


export default function Layout(props) {
    const { user, logoutUser } = useContext(UserProvider.context);


    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [searchButton, setSearchButton] = React.useState(null);
    const handleSearchButton = (event) => {
        setSearchButton(event.currentTarget);
    };
    const handleCloseSearchButton = () => {
        setSearchButton(null);
    };

    const [search, setSearch] = React.useState("");
    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    const [avatar, setAvatar] = React.useState(null);
    const handleClickAvatar = (event) => {    
        setAvatar(event.currentTarget);
    };
    const handleCloseAvatar = () => {
        setAvatar(null);
    };

    const [snackbar, setSnackBar] = React.useState(false);
    const handleSnackBar = () => {
        setSnackBar(true);
    };
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBar(false);
    };

    const logoutUserAnnounce = () => {
        logoutUser();
        handleSnackBar();
    };

    const handleGoSearch = () => {
        handleCloseSearchButton();
        if(search==="")
            Router.push(`/?page=${1}`);
        else
            Router.push(`/?search=${search}&page=${1}`);
    };

    const handleKeyPress = (event) => {
        if(event.key==="Enter") {
            handleGoSearch();
        }
    };

    const handleLogin = () => {
        Router.push('/login', '/login', { shallow: true });
    };

    const chooseIconForSecondSectionOfMenu = (text, index) => {
        if(index===0) return (
            <ListItem button key={text} component={Link} href="/challenges">
                <ListItemIcon>
                    <EmojiEventsRoundedIcon className={classes.icon}/>
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        );
        else return (
            <ListItem button key={text} component={Link} href="/creations">
                <ListItemIcon>
                    <BrushRoundedIcon className={classes.icon}/>
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        );
    }

    const chooseIconForThirdSectionOfMenu = (text,index) => {
        if(index===0) return (
            <ListItem button key={text} component={Link} href="/about">
                <ListItemIcon>
                    <EmojiPeopleRoundedIcon className={classes.icon}/>
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        );
        else if(index===1) return (
            <ListItem button key={text} component={Link} href="/contact">
                <ListItemIcon>
                    <HeadsetMicRoundedIcon className={classes.icon}/>
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        );
        else return (
            <ListItem button key={text} component={Link} href="/helpFolder/help">
                <ListItemIcon>
                    <LiveHelpRoundedIcon className={classes.icon}/>
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        );
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar classes={{
                    root: clsx(classes.rootToolBar, {
                        [classes.toolBarBackGroundLight]: theme.palette.type==='light',
                        [classes.toolBarBackGroundDark]: theme.palette.type==='dark',
                    })
                }}>
                    <div className={classes.leftDiv}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <IconButton 
                            aria-controls="simple-menu" 
                            aria-haspopup="true" 
                            onClick={handleSearchButton}
                            className={classes.menuButton}
                        >
                            <SearchRoundedIcon classes={{
                                root: classes.searchIcon
                            }}/>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={searchButton}
                            keepMounted
                            open={Boolean(searchButton)}
                            onClose={handleCloseSearchButton}
                            classes={{
                                list: classes.search
                            }}
                        >
                            <TextField 
                                onChange={handleChangeSearch}
                                onKeyPress={handleKeyPress}
                                id="standard-basic" 
                                placeholder="Search..."
                                type="search"
                            />
                            <Button 
                                onClick={handleGoSearch}
                                classes={{
                                    root: classes.searchButton
                                }}
                            >
                                <PlayArrowRoundedIcon/>
                            </Button>
                        </Menu>
                    </div>
                    <Link href='/'>
                        <img className={classes.MineCommand} src='/MineCommand.png' width='400px' height='auto'/>
                    </Link>
                    <div className={classes.rightDiv}>
                        {
                            theme.palette.type==='light' &&
                            <img 
                                className={classes.torch}  
                                src='/torchOn.png' 
                                height='50px'
                                width='auto'
                                onClick={props.toggleTheme}
                            />
                        }
                        {
                            theme.palette.type==='dark' &&
                            <img 
                                className={classes.torch}  
                                src='/torchOff.png' 
                                height='50px'
                                width='auto'
                                onClick={props.toggleTheme}
                            />
                        }
                        {
                            _.isEmpty(user) && 
                            <Button 
                                variant="contained" 
                                className={classes.loginRoot}
                                classes={{
                                    contained: classes.loginText
                                }}
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        }
                        {
                            !_.isEmpty(user) &&
                            <div>
                                <Avatar 
                                    src="" 
                                    className={classes.avatar}
                                    onClick={handleClickAvatar}
                                >
                                    {user.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={avatar}
                                    keepMounted
                                    open={Boolean(avatar)}
                                    onClose={handleCloseAvatar}
                                >
                                    <StyledMenuItem component={Link} href="/myAccount">
                                        <ListItemIcon>
                                            <SettingsRoundedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="My account" />
                                    </StyledMenuItem>
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <AccountBoxRoundedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick={logoutUserAnnounce}>
                                        <ListItemIcon>
                                            <MeetingRoomRoundedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Log Out" />
                                    </StyledMenuItem>
                                </StyledMenu>
                            </div>    
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="left"
                open={open}
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key='Home' component={Link} href="/">
                        <ListItemIcon>
                            <HomeRoundedIcon className={classes.icon}/>
                        </ListItemIcon>
                        <ListItemText primary='Home'/>
                    </ListItem>
                    <ListItem button key='News' component={Link} href="/news">
                        <ListItemIcon>
                            <MenuBookRoundedIcon className={classes.icon}/>
                        </ListItemIcon>
                        <ListItemText primary='News'/>
                    </ListItem>
                </List>
                <Divider /> 
                <List>
                    {['Challenges', 'Creations'].map((text, index) => (
                        chooseIconForSecondSectionOfMenu(text, index)
                    ))}
                </List>
                <Divider />
                <List>
                    {['About', 'Contact', 'Help'].map((text, index) => (
                        chooseIconForThirdSectionOfMenu(text, index)
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx({
                    [classes.contentLight]: theme.palette.type==='light',
                    [classes.contentDark]: theme.palette.type==='dark',
                })}
            >
                {/* <Scrollbars> */}
                <div className={classes.divider}/>
                <Grid 
                    item xs={12} 
                    //className={classes.contentMain}
                    className={classes.root}
                >
                    {props.children}
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    key={'bottom,right'}
                    open={snackbar}
                    onClose={handleCloseSnackBar}
                >
                    <Alert onClose={handleCloseSnackBar} severity="success">
                        Successfully log out!
                    </Alert>
                </Snackbar>
                {/* </Scrollbars> */}
            </main>
        </div>
    );
}
