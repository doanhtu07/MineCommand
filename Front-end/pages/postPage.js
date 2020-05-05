import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import Router, { withRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import BrushRoundedIcon from '@material-ui/icons/BrushRounded';
import EmojiEventsRoundedIcon from '@material-ui/icons/EmojiEventsRounded';
import UserProvider from '../contexts/UserProvider';


const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        background: theme.getColor("paper"),
        padding: theme.spacing(2),
    },  
    bigTitle: {
        fontSize: 'x-large',
        fontWeight: 'bold'
    },
    bigTitleGrid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    bigTitleSmallWords: {
        fontSize: 'small',
    },
    smallTitle: {
        fontSize: 'large',
        fontWeight: 'bold',
        //textDecoration: 'underline',
    },
    grid: {
        padding: 10
    },
    typeGrid: {
        padding: 10, 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    type: {
        marginLeft: 10
    },
    img: {
        width: '80%',
        height: 350,
        objectFit: 'scale-down'
    },
    chipOrange: {
        margin: 2,
        background: theme.palette.chip.orange,
        fontWeight: 'bold'
    },
    chipRed: {
        margin: 2,
        background: theme.palette.chip.red,
        fontWeight: 'bold'
    },
    chipBlue: {
        margin: 2,
        background: theme.palette.chip.blue,
        fontWeight: 'bold'
    },
    phototext: {
        fontSize: 'small'
    },
    textPhoto: {
        padding: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: 'x-large',
        fontWeight: 'bold'
    },
    descriptionPhoto: {
        display: 'flex',
        justifyContent: 'center'
    },
    descriptionPhotoGrid: {
        maxWidth: 'fit-content',
        margin: 5
    },
    image: {
        objectFit: 'scale-down'
    },
    descriptionContainer: {
        marginTop: 10,
    },
    descriptionGrid: {
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
    },
    descriptionGridCenter: {
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleAndDescription: {
        width: '100%'
    },
    deleteDiv: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    backDrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    backDropPaper: {
        width: 450,
        height: 500,
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column'
    },
    backDropDiv: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        flexGrow: 1,
    },
    yesNoDiv: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '75%'
    }, 
    backDropNote: {
        fontSize: 'medium',
        padding: 10,
        marginTop: 40,
        marginBottom: 35
    },
    backDropQuestion: {
        fontSize: 'large',
        padding: 10
    },
});

class PostPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},

            canDelete: false,
            deleteBackDrop: false,
        }
    }

    openDeleteBackDrop = () => {
        this.setState({ deleteBackDrop: true });
    }

    closeDeleteBackDrop = () => {
        this.setState({ deleteBackDrop: false });
    }

    deletePost = () => {
        axios.delete('/api/cardPost/delete', {
            params: {
                postId: this.state.post.id,
                postDescriptions: this.state.post.descriptions
            }
        })
        .then(res => {
            Router.push('/');
        })
        .catch(err => {
            console.log(err);
        })
    }

    getPost = (id) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/cardPost/getById', {
                params: {
                    id,
                }
            })
            .then(post => {
                resolve(post);
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    componentDidMount() {
        const { asPath } = this.props.router;
        const parsed = queryString.parse(asPath.substring(10));
        const id = parsed.id;

        if(_.isEmpty(this.state.post)) {
            const postPromise = this.getPost(id);
            const userPromise = this.context.getUser();
            Promise.all([postPromise, userPromise])
            .then(([post, user]) => {
                this.setState({
                    post: post.data,
                    canDelete: user.data.id===post.data.author.id
                })
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    render() {
        const { classes } = this.props;
        const { post } = this.state;

        return (
            <Paper className={classes.root}>
                {
                    _.isEmpty(post) &&
                    <CircularProgress/>
                }
                {
                    this.state.canDelete &&
                    <div className={classes.deleteDiv}>
                        <Button 
                            color="secondary"
                            onClick={this.openDeleteBackDrop}
                        >
                            Delete this post
                        </Button>
                    </div>
                }
                {
                    !_.isEmpty(post) &&
                    <Grid container direction="column">
                        <Grid item xs className={classes.bigTitleGrid}>
                            <Typography className={classes.bigTitle}>
                                {post.name}
                            </Typography>
                            <Typography className={classes.bigTitleSmallWords}>
                                Created by {post.author.name}
                            </Typography>
                            <Typography className={classes.bigTitleSmallWords}>
                                Last edited at {post.updatedAt.slice(0, 10)}
                            </Typography>
                        </Grid>
                        {
                            !_.isEmpty(post.image) &&
                            <Grid item xs className={classes.bigTitleGrid}>
                                <img className={classes.img} src={post.image}/>
                            </Grid>
                        }
                        <Grid item xs className={classes.grid}>
                            <Typography className={classes.smallTitle}>
                                Introduction
                            </Typography>
                            <Typography>
                                {post.introduction}
                            </Typography>
                        </Grid> 
                        <Grid item xs className={classes.typeGrid}>
                            <Typography className={classes.smallTitle}>
                                Type:     
                            </Typography>
                            <Typography className={classes.type}>
                                {post.type}
                                {
                                    post.type==="Creation"? 
                                    <BrushRoundedIcon/>:
                                    <EmojiEventsRoundedIcon/>
                                }
                            </Typography>
                        </Grid> 
                        <Grid item xs className={classes.typeGrid}>
                            <Typography className={classes.smallTitle}>
                                Sub Types:     
                            </Typography>
                            <div className={classes.type}>
                            {
                                post.subType.map((value) => (
                                    <Chip
                                        key={value} 
                                        label={value} 
                                        className=
                                        {
                                            value==="Command"?
                                            classes.chipOrange:
                                            value==="Redstone"?
                                            classes.chipRed:
                                            classes.chipBlue
                                        }
                                        size="small"
                                    />
                                ))
                            }
                            </div>
                        </Grid>
                        <Grid item xs container direction="column" 
                            spacing={2}
                            className={classes.descriptionContainer}
                        >
                            {
                                post.descriptions.map(item => (
                                    <Grid 
                                        key={item.id}
                                        item xs container 
                                        direction={
                                            item.layoutName==="left"?
                                            'row':
                                            item.layoutName==="right"?
                                            'row-reverse':
                                            'column'
                                        } 
                                        spacing={1}
                                        className={item.layoutName!=="center"? 
                                            classes.descriptionGrid:classes.descriptionGridCenter
                                        }
                                    >
                                        {
                                            !_.isEmpty(item.imageUrl) &&
                                            <Grid item container direction="column" 
                                                className={classes.descriptionPhotoGrid}
                                            >
                                                <Grid item xs className={classes.descriptionPhoto}>
                                                    <img className={classes.image} src={item.imageUrl}
                                                        height={item.layoutName==="center"? 250:150}
                                                    />
                                                </Grid>
                                                <Grid item xs className={classes.textPhoto}>
                                                    <Typography className={classes.phototext}>
                                                        {item.phototext}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        }
                                        <Grid item xs className={classes.titleAndDescription}>
                                            <Typography className={classes.title}>
                                                {item.title}
                                            </Typography>
                                            <Divider/>
                                            <Typography>
                                                {item.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                        </Grid> 
                    </Grid>
                }
                <Backdrop
                    className={classes.backDrop}
                    open={this.state.deleteBackDrop}
                >
                    <Paper
                        className={classes.backDropPaper}
                    >
                        <Button
                            onClick={this.closeDeleteBackDrop}
                        >
                            Cancel
                        </Button>
                        <div className={classes.backDropDiv}>
                            <Typography gutterBottom className={classes.backDropNote}>
                                If you delete this post, everyone is no longer able
                                to see it. All comments to this post and everything
                                related to it will be deleted.
                            </Typography>
                            <Typography className={classes.backDropQuestion}>
                                Are you still sure you want to delete 
                                this post?
                            </Typography>
                            <div className={classes.yesNoDiv}>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={this.closeDeleteBackDrop}
                                >
                                    No
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={this.deletePost}
                                >
                                    Yes
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </Backdrop>
            </Paper>
        );
    }
}

PostPage.contextType = UserProvider.context;

export default withStyles(styles)(withRouter(PostPage));