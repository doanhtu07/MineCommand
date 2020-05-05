import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Router, { withRouter } from 'next/router';
import queryString from 'query-string';
import Pagination from '@material-ui/lab/Pagination';
import ProfilePost from '../../components/ProfilePost';
import UserProvider from '../../contexts/UserProvider';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    posts: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    smallGrid: {
        maxWidth: 'fit-content',
        height: 'fit-content',
        padding: 20
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
    },
    paginationUL: {
        backgroundColor: theme.getColor("paper"),
        transition: theme.transitions.create('background-color', {
          easing: theme.transitions.easing.easeInOut,
          duration: 425,
        }),
        padding: '6px 4px',
        borderRadius: '4px',
    },
    yourPosts: {
        fontSize: 'x-large',
        fontWeight: 'bold'
    },
    paginationSelected: {
        background: theme.getColor("primary")
    },
});

class MyPosts extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            posts: [],
            page: 1,
            maxPage: 1,
            search: ""
        };
    }

    handleGo = (event, newPage) => {
        if(this.state.search==="") 
            Router.push(
                `/profileFolder/myPosts?page=${newPage}`, 
                `/profileFolder/myPosts?page=${newPage}`, 
                { shallow: true }
            );
        // else 
        //   Router.push(
        //     `/?search=${this.state.search}&page=${newPage}`,
        //     `/?search=${this.state.search}&page=${newPage}`,
        //     { shallow: true }
        //   );
    };

    getMaxPage = (count) => {
        axios.get('/api/cardPost/getNumberOfUserPosts', {
            params: {
                authorId: this.context.user.id,
            }
        })
        .then(res => {
            const totalPosts = parseInt(res.data, 10);
            this.setState({
                maxPage: Math.round( (totalPosts + count - 1) / count )
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    getPage = (page) => {
        this.getMaxPage(16);
        axios.get('/api/cardPost/getPostsOfUser', {
            params: {
                page: page,
                count: 16,
                authorId: this.context.user.id
            }
        })
        .then(res => {
            this.setState({ 
                page,
                posts: res.data
            });
        })
        .catch(e => {
            console.log(e);
        })
      };

    componentCheck = (page, search) => {
        let pageInt = parseInt(page, 10);
        if(search!==undefined) {
            this.setState({ search });
            //this.getPageWithSearch(page, search);
        }
        else {
            this.setState({ search: "" });
            if(page!==undefined)
                this.getPage(pageInt);
            else
                this.getPage(1);
        }
        window.scrollTo(0, 0);
    };

    componentDidMount() {
        const { asPath } = this.props.router;
        const parsed = queryString.parse(asPath.substring(22));
        const page = parsed.page;
        const search = parsed.search;

        this.context.getUser()
        .then(user => {
            if(_.isEmpty(user.data)) {
                Router.push('/');
                return;
            }

            this.componentCheck(page, search);
        })
    }

    componentDidUpdate(prevProps) {
        const { asPath } = this.props.router;
        const { asPath: prevAsPath } = prevProps.router;
        const parsed = queryString.parse(asPath.substring(22));
        const page = parsed.page;
        const search = parsed.search;
    
        this.context.getUser()
        .then(user => {
            if(_.isEmpty(user.data)) {
                Router.push('/');
                return;
            }

            if(asPath !== prevAsPath) 
                this.componentCheck(page, search);
        })
        
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography className={classes.yourPosts}>
                    Your posts:
                </Typography>
                <Divider/>
                <Grid item xs container className={classes.posts}>
                    {
                        this.state.posts.map(post => (
                            <Grid key={post.id} item xs={8} sm={5} md={4} className={classes.smallGrid}>
                                <ProfilePost info={post}/>
                            </Grid>
                        ))
                    }
                </Grid>
                <Pagination
                    onChange={this.handleGo} 
                    page={this.state.page} 
                    count={this.state.maxPage} 
                    color="primary" 
                    className={classes.pagination}
                    classes={{
                      ul: classes.paginationUL
                    }}
                    showFirstButton 
                    showLastButton
                />
            </div>
        );
    }
}

MyPosts.contextType = UserProvider.context;

export default withStyles(styles)(withRouter(MyPosts));