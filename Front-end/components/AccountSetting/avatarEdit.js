import React from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ImageItem from './SmallComponents/ImageItem.js';
import AvatarCanvas from './SmallComponents/AvatarCanvas';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserProvider from '../../contexts/UserProvider';

const styles = theme => ({
    hide: {
        display: 'none'
    },
    avatar: {
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 170,
        height: 170,
        borderRadius: '50%',
        marginRight: 10
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: '50%'
    },
    backDrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    avatarBackDrop: {
        width: 460,
        height: 600,
        padding: theme.spacing(0),
    },
    avatarContent: {
        height: '-webkit-fill-available'
    },
    backDropAvatar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    imagesContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 180,
        width: '100%',
        padding: 5,
        flexGrow: 1
    },
    gridItems: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seeMore: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5
    },
    seeMoreButton: {
        maxHeight: '30px',
    },
    seeMoreLabel: {
        fontSize: 'smaller',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadPhoto: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(4),
        background: theme.palette.barButton.main,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    uploadPhotoLabel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    yourUploadedPhotos: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },  
    smallImages: {
        height: 125,
        width: 125,
        borderRadius: 5,
    },
    actionGridBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2
    },
});

class avatarEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            selectedId: "",
            arraySelectedId: [],
            deleteMode: false,
            photos: [],
            totalPhotos: 0,
            photoEditor: {},
        };
    }

    photoEditorChange = (editor) => {
        this.setState({ photoEditor: editor });
    }

    photoEditorSave = () => {
        if(!_.isEmpty(this.state.photoEditor)) {
            const canvas = this.state.photoEditor.getImageScaledToCanvas().toDataURL();
            fetch(canvas)
            .then(res => {
                return res.blob();
            })
            .then(blobFile => {
                const formData = new FormData();
                formData.append('file', blobFile);
                formData.append('userId', this.state.user.id);

                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };

                return axios.put('/api/photo/updateAvatar', formData, config);
            })
            .then(res => {
                this.context.forceReloadPage();
                this.props.openSnackBar("success", "avatar");
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    addArraySelectedId = (photoId) => {
        let temp = this.state.arraySelectedId;
        temp.push(photoId);
        this.setState({ arraySelectedId: temp });
    }

    removeArraySelectedId = (photoId) => {
        let temp = this.state.arraySelectedId;
        temp.splice(temp.indexOf(photoId), 1);
        this.setState({ arraySelectedId: temp });
    }

    arraySelectedIdInclude = (photoId) => {
        let temp = this.state.arraySelectedId;
        return temp.indexOf(photoId)>=0;
    }

    cancelDelete = () => {
        this.setState({
            selectedId: "",
            arraySelectedId: [],
            deleteMode: false,
        });
        this.getUserPhotos(3);
    }

    doneDelete = () => {
        axios.delete('/api/photo/deletePhotosOfUser', {
            params: {
                userId: this.state.user.id,
                photos: this.state.arraySelectedId
            }
        })
        .then(() => {
            this.getUserPhotos(6);
            this.props.openSnackBar("success", "photos");
        })
        .catch(err => {
            console.log(err);
            this.props.openSnackBar("error", "photos");
        })
    }

    deleteButton = () => {
        this.getUserPhotos(6);
        this.setState({
            deleteMode: true,
            selectedId: "",
            arraySelectedId: []
        });
    }

    seeMore = () => {
        this.getUserPhotos(this.state.photos.length+6);
    }

    closeBackDrop = () => {
        this.setState({
            selectedId: "",
            arraySelectedId: [],
            deleteMode: false
        });
        this.getUserPhotos(3);

        this.props.closeBackDrop();
    }

    inputPhoto = (event) => {
        const formData = new FormData();
        let count = 0;
        while(event.target.files[count]) {
            formData.append(`file[${count}]`, event.target.files[count]);
            count++;
        }
        formData.append('userID', this.state.user.id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post('/api/photo/uploadPhoto', formData, config)
        .then(res => {
            let temp = this.state.photos;
            res.data.map(photo => {
                if(temp.length>=3)
                    temp.pop();
                temp.unshift(photo);
            });
            this.setState({ photos: temp });   
            this.getTotalNumberOfPhotos();   
            this.props.openSnackBar("success", "photos");  
        })
        .catch(err => {
            console.log(err);
        });
    }

    getUserPhotos = (numItems) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/photo/getPhotosOfUser', {
                params: {
                    userId: this.state.user.id,
                    numItems
                }
            })
            .then(photos => {
                this.setState({ photos: photos.data });
                this.getTotalNumberOfPhotos();
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
        });
    }

    getTotalNumberOfPhotos = () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/photo/getTotalPhotosOfUser', {
                params: {
                    userId: this.state.user.id
                }
            })
            .then(photos => {
                this.setState({ totalPhotos: photos.data });
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
        });
    }

    componentDidMount() {
        this.getUserPhotos(3);
        this.setState({ user: this.context.user });
    }

    componentDidUpdate() {
        if(!_.isEqual(this.state.user, this.context.user)) 
            this.setState({ user: this.context.user });
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid item className={classes.avatar}>
                <ButtonBase 
                    className={classes.image}
                    onMouseEnter={this.props.mouseEnter}
                    onMouseLeave={this.props.mouseLeave}
                    onClick={this.props.openBackDrop}
                >
                    {
                        this.state.user.avatarUrl &&
                        <img className={classes.img} src={this.state.user.avatarUrl} />
                    }
                    {   
                        !this.state.user.avatarUrl &&
                        <AccountCircleIcon className={classes.img}/>
                    }
                </ButtonBase>
                <EditRoundedIcon
                    className={clsx({
                        [classes.hide]: !this.props.hover
                    })}
                />
                <Backdrop 
                    className={classes.backDrop}
                    open={this.props.backDrop}
                >
                    <Paper className={classes.avatarBackDrop}>
                        <Grid container direction="column" className={classes.avatarContent}>
                            <Grid item xs={12} className={classes.actionGridBar}>
                                <Button onClick={this.closeBackDrop}>
                                    Cancel
                                </Button>
                                <div>
                                    {
                                        this.state.selectedId!=="" && !this.state.deleteMode &&
                                        <Button
                                            onClick={this.photoEditorSave}
                                        >
                                            Save
                                        </Button>
                                    }
                                    {
                                        !this.state.deleteMode &&
                                        <Button
                                            onClick={this.deleteButton}
                                        >
                                            Delete
                                        </Button>
                                    }
                                    {
                                        this.state.deleteMode &&
                                        <div>
                                            <Button onClick={this.cancelDelete}>
                                                <ClearRoundedIcon/>
                                            </Button>
                                            {
                                                this.state.arraySelectedId.length!==0 &&
                                                <Button onClick={this.doneDelete}>
                                                    <DoneRoundedIcon/>
                                                </Button>
                                            }
                                        </div>
                                    }
                                </div>
                            </Grid>
                            {
                                !this.state.deleteMode && _.isEmpty(this.state.selectedId) &&
                                <Grid item xs={12} className={classes.backDropAvatar}>
                                    {
                                        this.state.user.avatarUrl && 
                                        _.isEmpty(this.state.selectedId) &&

                                        <img className={classes.image} src={this.state.user.avatarUrl} />
                                    }
                                    {   
                                        !this.state.user.avatarUrl && 
                                        _.isEmpty(this.state.selectedId) &&

                                        <AccountCircleIcon className={classes.image}/>
                                    }
                                </Grid>
                            }
                            {
                                !this.state.deleteMode && !_.isEmpty(this.state.selectedId) &&
                                <AvatarCanvas 
                                    photos={this.state.photos}
                                    selectedId={this.state.selectedId}
                                    photoEditorChange={this.photoEditorChange}
                                />
                            }
                            <Grid item xs={12} className={classes.yourUploadedPhotos}>
                                <Typography variant="button">
                                    Your uploaded photos:
                                </Typography>
                                <Typography variant="caption">
                                    {this.state.photos.length}/{this.state.totalPhotos}
                                </Typography>
                            </Grid>
                            <CssBaseline/>
                            <GridList 
                                cellHeight={140}  
                                className={classes.imagesContainer}
                                cols={3}
                            >
                                {this.state.photos.map(photo => (
                                    <ImageItem 
                                        key={photo.id} 
                                        info={photo}
                                        selected={
                                            (this.state.selectedId===photo.id && !this.state.deleteMode) ||
                                            (this.arraySelectedIdInclude(photo.id) && this.state.deleteMode) 
                                            ? true : false
                                        }
                                        onSelect={() => {
                                            if (this.state.selectedId!==photo.id) 
                                                this.setState({ selectedId: photo.id });
                                            else
                                                this.setState({ selectedId: "" });
                                            
                                            if(!this.arraySelectedIdInclude(photo.id))
                                                this.addArraySelectedId(photo.id);
                                            else
                                                this.removeArraySelectedId(photo.id);
                                            }
                                        }
                                    />
                                ))}
                            </GridList>
                            <Grid item xs={12} className={classes.seeMore}>
                                <Button onClick={this.seeMore} className={classes.seeMoreButton}
                                    classes={{
                                        label: classes.seeMoreLabel
                                    }}
                                >
                                    See More
                                </Button>
                            </Grid>
                            {
                                (
                                    _.isEmpty(this.state.selectedId) || 
                                    (!_.isEmpty(this.state.selectedId) && this.state.deleteMode)
                                ) &&
                                <Grid item xs={12}>
                                    <input
                                        accept="image/*"
                                        className={classes.hide}
                                        id="upload-file-photo"
                                        multiple
                                        type="file"
                                        onChange={this.inputPhoto}
                                    />
                                    <label htmlFor="upload-file-photo">
                                        <Button 
                                            className={classes.uploadPhoto}
                                            classes={{
                                                label: classes.uploadPhotoLabel
                                            }}
                                            component="span"
                                        >
                                            <Typography variant="button">
                                                Upload your new photos
                                            </Typography>
                                            <AddCircleRoundedIcon/>
                                        </Button>
                                    </label>
                            </Grid>
                            }
                        </Grid>
                    </Paper>
                </Backdrop>
            </Grid>
        );
    }
}

avatarEdit.contextType = UserProvider.context;

export default withStyles(styles)(avatarEdit);