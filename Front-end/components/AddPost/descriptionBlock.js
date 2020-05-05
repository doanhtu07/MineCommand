import React from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import UploadPhotoBackDrop from './uploadPhotoBackDrop.js';
import UserProvider from '../../contexts/UserProvider';
import { ButtonBase } from '@material-ui/core';

const styles = theme => ({
    hide: {
        display: 'none'
    },
    textField100: {
        width: '100%',
    },
    photoButton50: {
        width: '50%',
        height: '100%',
        minHeight: 200,
        minWidth: 200,
    },
    photoButton100: {
        width: '100%',
        height: '100%',
        minHeight: 200,
        minWidth: 200,
    },
    textPhoto: {
        padding: 5,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backDrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    image: {
        objectFit: 'scale-down'
    },
    addPhoto: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPhotoGrid: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: 'fit-content'
    },
    imageButton: {
        maxWidth: 'fit-content',
    },
    titleAndDescription: {
        width: '100%'
    },
    title: {
        maxHeight: 'fit-content'
    },
});

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

class DescriptionBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            imageUrl: "",
            layoutName: "left",

            error: "",
            backDrop: false,
            snackBar: false,
            snackBarTitle: "",
            alertSeverity: "",

            layout: null,
        };
    }

    title = ""
    description = ""
    phototext = ""

    handleLayout = (layoutName) => {
        this.setState({ layoutName });
    }

    handleCloseLayout = () => {
        this.setState({ layout: null });
    }

    handleOpenLayout = (event) => {
        this.setState({ layout: event.currentTarget });
    }

    handleChange = () => {
        const { index, title, description, imageUrl, phototext, layoutName } = this.state;
        const thisDescription = {
            index, title, description, imageUrl, phototext, layoutName
        };
        if(!_.isEqual(thisDescription, this.props.description))
            this.props.saveEachDescription({
                index,
                title: this.title,
                description: this.description,
                imageUrl,
                phototext: this.phototext,
                layoutName
            });
    }

    handleTitle = (event) => {
        this.title=event.target.value;
    }
    handleDescription = (event) => {
        this.description=event.target.value;
    }
    handlePhototext = (event) => {
        this.phototext=event.target.value;
    }

    handleCloseBackDrop = () => {
        this.setState({ backDrop: false });
    }
    openSnackBar = (alertSeverity, snackBarTitle) => {
        this.setState({
            snackBar: true,
            alertSeverity,
            snackBarTitle
        });
    }
    closeSnackBar = () => {
        this.setState({ 
            snackBar: false,
            snackBarTitle: ""
        });
    }
    handleAddPhoto = () => {
        this.setState({ backDrop: true });
    }
    changeImageUrl = (imageUrl) => {
        this.setState({ imageUrl });
    }


    componentDidMount() {
        this.setState({ index: this.props.index });
        
        this.interval = setInterval(this.handleChange, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid item xs container direction="column" spacing={1}>
                <Grid item xs className={classes.toolbar}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.handleOpenLayout}
                        aria-controls="Layout"
                        aria-haspopup="true"
                    >
                        Layout
                    </Button>
                    <Menu
                        id="Layout"
                        anchorEl={this.state.layout}
                        keepMounted
                        open={Boolean(this.state.layout)}
                        onClose={this.handleCloseLayout}
                        >
                        <MenuItem onClick={() => {this.handleLayout("left")}}>Left</MenuItem>
                        <MenuItem onClick={() => {this.handleLayout("center")}}>Center</MenuItem>
                        <MenuItem onClick={() => {this.handleLayout("right")}}>Right</MenuItem>
                    </Menu>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            this.props.remove(this.props.index);
                        }}
                        disabled={this.props.disabled}
                    >
                        Remove this description
                    </Button>
                </Grid>
                <Grid 
                    item xs container 
                    direction={
                        this.state.layoutName==="left"?
                        'row':
                        this.state.layoutName==="right"?
                        'row-reverse':
                        'column'
                    } 
                    spacing={1}
                    className={this.state.layoutName==="center"? classes.addPhoto:""}
                >
                    <Grid item container direction="column"
                        xs={this.state.layoutName==="center"? true:4}
                        className={classes.addPhotoGrid}
                    >
                        <Grid item xs className={classes.addPhoto}>
                            {   
                                _.isEmpty(this.state.imageUrl) &&
                                <Button 
                                    className={this.state.layoutName==="center"?
                                        classes.photoButton50:classes.photoButton100
                                    }
                                    variant="outlined"
                                    onClick={this.handleAddPhoto}
                                >
                                    Add a photo
                                </Button>
                            }
                            {
                                !_.isEmpty(this.state.imageUrl) &&
                                <Button onClick={this.handleAddPhoto}
                                    className={classes.imageButton}
                                >
                                    <img className={classes.image} src={this.state.imageUrl}
                                        height={this.state.layoutName==="center"? 250:150}
                                    />
                                </Button>
                            }
                        </Grid>
                        <Grid item xs className={classes.textPhoto}>
                            <InputBase
                                onChange={this.handlePhototext}
                                className={classes.textField100}
                                inputProps={{
                                    style: {
                                        fontSize: 'small',
                                    }
                                }}
                                placeholder="Describe photo..."
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="column" spacing={1}
                        className={classes.titleAndDescription}
                    >
                        <Grid item xs className={classes.title}>
                            <InputBase
                                inputProps={{
                                    style: {
                                        fontSize: 'x-large',
                                        fontWeight: 'bold'
                                    }
                                }}
                                placeholder="Enter title..."
                                onChange={this.handleTitle}
                                fullWidth
                            />
                        </Grid>
                        <Divider/>
                        <Grid item xs>
                            <InputBase
                                onChange={this.handleDescription}
                                fullWidth
                                placeholder="Describe your post..."
                                multiline
                                rows={this.state.layoutName==="center"? 5:10}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Backdrop
                    className={classes.backDrop}
                    open={this.state.backDrop}
                >
                    <UploadPhotoBackDrop
                        closeBackDrop={this.handleCloseBackDrop}
                        openSnackBar={this.openSnackBar}
                        closeSnackBar={this.closeSnackBar}
                        changeImageUrl={this.changeImageUrl}
                    />
                </Backdrop>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    key={'bottom,right'}
                    open={this.state.snackBar}
                    onClose={this.closeSnackBar}
                >
                    <Alert onClose={this.closeSnackBar} severity={this.state.alertSeverity}>
                        {
                            this.state.alertSeverity==="success" &&
                            <Typography variant="button">
                                Successfully add {this.state.snackBarTitle}
                            </Typography>
                        }
                        {
                            this.state.alertSeverity==="error" &&
                            <Typography variant="button">
                                Error at {this.state.snackBarTitle}. Please re-enter your current page to reload.
                            </Typography>
                        }
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }
}

DescriptionBlock.contextType = UserProvider.context;

export default withStyles(styles)(DescriptionBlock);