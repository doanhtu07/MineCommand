import React from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserProvider from '../../contexts/UserProvider';

const styles = theme => ({
    hide: {
        display: 'none'
    },
    imagesContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 370,
        width: '100%',
        padding: 5,
        flexGrow: 2
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
    actionGridBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2
    },
    smallImages: {
        height: 135,
        width: 135,
        borderRadius: 5,
        padding: 2
    },
    smallImagesBorder: {
        '&:hover': {
            borderColor: '#74bcffbd',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '5px',
            boxShadow: '0px 0px 5px #c0daff',
        },
    },
    gridItems: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    avatarBackDrop: {
        width: 460,
        height: 600,
        padding: theme.spacing(0),
    },
});

class UploadPhotoBackDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            photos: [],
            totalPhotos: 0,
        };
    }

    seeMore = () => {
        this.getUserPhotos(this.state.photos.length+6);
    }

    closeBackDrop = () => {
        this.getUserPhotos(6);
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
                if(temp.length>=6)
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
        this.getUserPhotos(6);
        this.setState({ user: this.context.user });
    }

    componentDidUpdate() {
        if(!_.isEqual(this.state.user, this.context.user)) 
            this.setState({ user: this.context.user });
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.avatarBackDrop}>
                <Grid container direction="column" className={classes.avatarContent}>
                    <Grid item xs={12} className={classes.actionGridBar}>
                        <Button onClick={this.closeBackDrop}>
                            Close
                        </Button>
                    </Grid>
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
                            <GridListTile
                                key={photo.id}
                                className={classes.gridItems}
                                cols={1}
                            >
                                <ButtonBase 
                                    onClick={() => {
                                        this.props.closeBackDrop();
                                        this.props.changeImageUrl(photo.url);
                                    }}
                                    className={classes.smallImagesBorder}
                                >
                                    <img 
                                        className={classes.smallImages} 
                                        src={photo.url}
                                    />
                                </ButtonBase>
                            </GridListTile>
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
                </Grid>
            </Paper>
        );
    }
}

UploadPhotoBackDrop.contextType = UserProvider.context;

export default withStyles(styles)(UploadPhotoBackDrop);