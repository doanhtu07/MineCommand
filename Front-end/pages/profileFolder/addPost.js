import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import AddRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UserProvider from '../../contexts/UserProvider.js';
import { Backdrop } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import UploadPhotoBackDrop from '../../components/AddPost/uploadPhotoBackDrop.js';
import DescriptionBlock from '../../components/AddPost/descriptionBlock.js';

const styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper"),
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: 'large',
        marginBottom: 30
    },
    img: {
        width: '100%',
        height: 350,
        objectFit: 'scale-down'
    },
    buttonBaseUpload: {
        width: '100%',
        height: 200,
        borderRadius: 5,
    },
    buttonLabel: {
        fontSize: 'large',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    buttonLabelSmall: {
        fontSize: 'small',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    normalGrid: {
        marginBottom: 20
    },
    specialGrid: {
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formcontrol: {
        width: '100%'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chipOrange: {
        margin: 2,
        background: theme.palette.chip.orange,
    },
    chipRed: {
        margin: 2,
        background: theme.palette.chip.red,
    },
    chipBlue: {
        margin: 2,
        background: theme.palette.chip.blue
    },
    submit: {
        background: theme.palette.barButton.main,
        width: '25%'
    },
    submitGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 'medium',
        color: theme.palette.error.main
    },
    backDrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    uploadImageButton: {
        maxHeight: 'fit-content',
        width: '100%'
    },
    divider: {
        marginBottom: 10,
        marginTop: 20
    },
}); 

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};


class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            image: {},

            type: "",
            subType: [],
            descriptionsArray: [{ index: 0 }],

            descriptionIdAvailable: 1,

            error: "",
            backDrop: false,
            snackBar: false,
            snackBarTitle: "",
            alertSeverity: "",

            keysPressed: {},
        };
    }

    ITEM_HEIGHT = 48;
    ITEM_PADDING_TOP = 8;
    MenuProps = {
        PaperProps: {
            style: {
                maxHeight: this.ITEM_HEIGHT * 4.5 + this.ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    subTypes = [
        'Command',
        'Redstone',
        'Furniture',
    ]

    hotkeys = [
        'Control',
        'Meta',
        'Enter'
    ]

    name = ""
    introduction = ""

    handleKeyDown = (event) => {
        if(this.hotkeys.indexOf(event.key)>=0) {
            event.persist();
            let temp = this.state.keysPressed;
            temp[event.key] = true;

            this.setState({ keysPressed: temp }, () => {
                if (
                    (this.state.keysPressed['Control'] || this.state.keysPressed['Meta'])
                    && event.key === 'Enter'
                ) {
                    this.addDescription();
                }
            });
        }
    }

    handleKeyUp = (event) => {
        if(this.hotkeys.indexOf(event.key)>=0) {
            this.setState({ keysPressed: {} });
        }
    }

    saveEachDescription = (attributes) => {
        let temp = this.state.descriptionsArray;

        let position = temp.map((e) => { 
            return e.index; 
        }).indexOf(attributes.index); 

        temp[position] = attributes;
        this.setState({ descriptionsArray: temp });
    }

    addDescription = () => {
        let temp = this.state.descriptionsArray;
        temp.push({index: this.state.descriptionIdAvailable}); 
        this.setState({ 
            descriptionsArray: temp,
            descriptionIdAvailable: this.state.descriptionIdAvailable + 1 
        });
    }

    removeDescription = (index) => {
        let temp = this.state.descriptionsArray;

        if(temp.length>1) {
            let position = temp.map((e) => { 
                return e.index; 
            }).indexOf(index); 

            temp.splice(position, 1);
            this.setState({ descriptionsArray: temp });
        }
    }

    changeImageUrl = (imageUrl) => {
        this.setState({ image: imageUrl });
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

    handleUploadButton = () => {
        this.setState({ backDrop: true });
    }

    handleCloseBackDrop = () => {
        this.setState({ backDrop: false });
    }

    handleName = (event) => {
        this.name = event.target.value;
    }

    handleIntroduction = (event) => {
        this.introduction = event.target.value;
    }

    handleType = (event) => {
        this.setState({ type: event.target.value });
    }

    handleSubType = (event) => {
        this.setState({ subType: event.target.value });
    };

    handleSubmit = () => {
        const { descriptionsArray, type, subType, image } = this.state;
        let typeRef = "";
        if(type===1) 
            typeRef = "Creation";
        else if(type===2)
            typeRef = "Challenge";

        if(
            _.isEmpty(this.name) ||
            _.isEmpty(this.introduction) ||
            _.isEmpty(typeRef) ||
            _.isEmpty(subType)
        )
            this.setState({ error: "You forget to fill in some required fields." });
        else {
            axios.put('/api/cardPost/create', {
                name: this.name,
                introduction: this.introduction,
                descriptionsArray,
                typeRef,
                subType,
                image,
                authorId: this.state.user.id,
            })
            .then(res => {
                this.openSnackBar("success", "post");
                Router.push('/');
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    componentCheck = () => {
        this.context.getUser()
        .then(user => {
            if(_.isEmpty(user.data)) {
                Router.push('/');
                return;
            }

            if(!_.isEqual(this.state.user, user.data)) {
                this.setState({ 
                    user: user.data,
                });
            }
        })
    }

    componentDidUpdate() {
        this.componentCheck();
    }

    render() {
        const { classes } = this.props; 

        return (
            <Paper className={classes.root}>
                <Typography 
                    variant="button"
                    className={classes.title}
                >
                    Creating Your New Post
                    <Divider />
                </Typography>
                <Grid container spacing={2} direction="column">
                    <Grid item xs className={classes.normalGrid}>
                        {
                            _.isEmpty(this.state.image) &&
                            <Button
                                className={classes.buttonBaseUpload}
                                variant="outlined"
                                color="primary"
                                classes={{
                                    label: classes.buttonLabel
                                }}
                                onClick={this.handleUploadButton}
                            >
                                Use a picture (optional)
                                <AddRoundedIcon/>
                            </Button>
                        }
                        {
                            !_.isEmpty(this.state.image) &&
                            <img src={this.state.image} className={classes.img}/>
                        }
                    </Grid>
                    <Grid item xs container spacing={4}>
                        {
                            !_.isEmpty(this.state.image) &&
                            <Grid item xs>
                                <Button
                                    className={classes.uploadImageButton}
                                    variant="outlined"
                                    color="primary"
                                    classes={{
                                        label: classes.buttonLabelSmall
                                    }}
                                    onClick={this.handleUploadButton}
                                >
                                    Use a different picture
                                    <AddRoundedIcon/>
                                </Button>
                            </Grid>
                        }
                    </Grid>
                    <Grid item xs className={classes.normalGrid}>
                        <Typography>
                            Name (required):
                        </Typography>
                        <InputBase
                            required
                            id="Name"
                            label="Required"
                            placeholder="Enter your post's name"
                            variant="outlined"
                            inputProps={{
                                style: {
                                    fontSize: 'x-large',
                                    fontWeight: 'bold'
                                }
                            }}
                            onChange={this.handleName}
                        />
                    </Grid>
                    <Grid item xs className={classes.normalGrid}>
                        <Typography>
                            Introduction (required):
                        </Typography>
                        <InputBase
                            className={classes.formcontrol}
                            required
                            id="Introduction"
                            label="Required"
                            placeholder="Describe generally what your post is about..."
                            variant="outlined"
                            multiline
                            rows={3}
                            onChange={this.handleIntroduction}
                        />
                    </Grid>
                    <Grid item xs className={classes.normalGrid}
                        onKeyDown={this.handleKeyDown}
                        onKeyUp={this.handleKeyUp}
                    >
                        <Typography gutterBottom>
                            Descriptions (Optional): 
                        </Typography>
                        <Grid
                            spacing={4} 
                            direction="column" 
                            container
                        >
                            {
                                this.state.descriptionsArray.map(description => (
                                    <Grid 
                                        key={description.index}
                                        item 
                                        container 
                                        spacing={2} 
                                        direction="column"
                                    >
                                        <DescriptionBlock
                                            description={description} 
                                            index={description.index}
                                            remove={this.removeDescription}
                                            saveEachDescription={this.saveEachDescription}
                                            disabled={this.state.descriptionsArray.length===1}
                                        />
                                        <Divider className={classes.divider}/>
                                    </Grid>
                                ))
                            }
                            <Grid item xs>
                                <Typography>
                                    Number of descriptions: {this.state.descriptionsArray.length}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={this.addDescription}
                                >
                                    Add a description
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Typography>
                            Note: For Type, you can only choose one. For Sub Type, you can
                            choose as many as you want that fit your post.
                        </Typography>
                    </Grid>
                    <Grid item container xs className={classes.specialGrid}>
                        <Grid item xs={12} sm={5}>
                            <FormControl 
                                required 
                                className={classes.formcontrol}
                            >
                                <InputLabel id="Type">Type</InputLabel>
                                <Select
                                    labelId="typeLabel"
                                    id="Type"
                                    value={this.state.type}
                                    onChange={this.handleType}
                                    label="Type"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Creation</MenuItem>
                                    <MenuItem value={2}>Challenge</MenuItem>
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl 
                                required 
                                className={classes.formcontrol}
                            >
                                <InputLabel id="Sub Type">Sub Type</InputLabel>
                                <Select
                                    labelId="Sub Type-Label"
                                    id="Sub Type"
                                    multiple
                                    value={this.state.subType}
                                    onChange={this.handleSubType}
                                    input={<Input id="selected-type"/>}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip 
                                                    key={value} 
                                                    label={value} 
                                                    className={
                                                        value==="Command"?
                                                        classes.chipOrange:
                                                        value==="Redstone"?
                                                        classes.chipRed:
                                                        classes.chipBlue
                                                    }
                                                />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={this.MenuProps}
                                >
                                    {this.subTypes.map((subType) => (
                                        <MenuItem 
                                            key={subType} 
                                            value={subType} 
                                        >
                                            {subType}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs className={classes.normalGrid}>
                        <Typography>
                            Download Link (Optional):
                        </Typography>
                        <TextField
                            id="Download Link"
                            placeholder="Enter a download link here..."
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs className={classes.normalGrid}>
                        <Typography>
                            Video (Optional):
                        </Typography>
                        <TextField
                            id="Video"
                            placeholder="..."
                            variant="outlined"
                        />
                    </Grid>
                    {
                        !_.isEmpty(this.state.error) &&
                        <Grid item xs>
                            <Typography className={classes.error}>
                                Error: {this.state.error}
                            </Typography>
                        </Grid>    
                    }
                    <Grid item xs className={classes.submitGrid}>
                        <Button 
                            className={classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
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
            </Paper>
        );
    }
}

AddPost.contextType = UserProvider.context;

export default withStyles(styles)(AddPost);