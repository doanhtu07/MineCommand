import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Router from 'next/router';
import Link from '../../src/Link';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserProvider from '../../contexts/UserProvider.js';
import ProfilePost from '../../components/ProfilePost.js';

const styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper"),
        height: '100%',
        width: '100%'
    },
    buttonAddPost: {
        display: 'flex',
        background: theme.palette.barButton.main,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    addIcon: {
        height: 50,
        width: 50,
        fill: theme.palette.type==="light"? theme.palette.common.white:theme.palette.common.black,
        transition: theme.transitions.create('fill', {
            easing: theme.transitions.easing.easeInOut,
            duration: 425,
        }),
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
    postsTitle: {
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%'
    },
    posts: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    postsGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallGrid: {
        maxWidth: 'fit-content',
        height: 'fit-content',
        padding: 10
    },
    seeMore: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: [], 
        };
    }

    getPosts = (count) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/cardPost/getPostsOfUser', {
                params: {
                    authorId: this.context.user.id,
                    count,
                }
            })
            .then(posts => {
                resolve(posts);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    componentCheck = () => {

        if (!_.isEmpty(this.context.user)) {
            if(!_.isEqual(this.state.user, this.context.user)) {
                this.setState({ 
                    user: this.context.user,
                });
            }
        }

        else {
            Router.push('/');
        }
    }

    componentDidMount() {
        this.getPosts(3)
        .then(posts => {
            this.setState({
                posts: posts.data
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    componentDidUpdate() {
        this.componentCheck();
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
                    <Grid item xs={12} container className={classes.postsGrid}>
                        <div className={classes.postsTitle}>
                            <Typography variant="button">
                                Your uploaded posts:
                            </Typography>
                        </div>
                        {
                            !_.isEmpty(this.state.posts) &&
                            <Grid item xs={12} container direction="row" className={classes.posts}>
                                {
                                    this.state.posts.map(post => (
                                        <Grid key={post.id} item xs={8} sm={5} md={4} className={classes.smallGrid}>
                                            <ProfilePost info={post}/>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        }
                        {
                            _.isEmpty(this.state.posts) &&
                            <Grid item xs={12} className={classes.posts}>
                                <Typography>
                                    It seems like you have no post yet. Create your first
                                    one!
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                    {
                        !_.isEmpty(this.state.posts) &&
                        <Grid item xs={12} className={classes.seeMore}>
                            <Button>
                                See More
                            </Button>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <Button 
                            className={classes.buttonAddPost}
                            component={Link}
                            href='/profileEdit/addPost'
                        >
                            <AddCircleRoundedIcon className={classes.addIcon}/>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

MyProfile.contextType = UserProvider.context;

export default withStyles(styles)(MyProfile);