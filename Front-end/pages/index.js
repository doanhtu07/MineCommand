import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import queryString from 'query-string';
//import { fade, makeStyles } from '@material-ui/core/styles';
import { fade, withStyles } from '@material-ui/core/styles';
import CardPost from '../components/CardPost';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Router, { withRouter } from 'next/router';


const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.getColor("paper"),
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '150px'
  },
  note: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: 'large',
    fontWeight: 'bold'
  },
  smallGrid: {
    maxWidth: 'fit-content',
  },
  show: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '8px'
  },
  arrayCards: {
    marginBottom: '8px'
  },
  input: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  paginationUL: {
    backgroundColor: theme.getColor("paper"),
    padding: '6px 4px',
    borderRadius: '4px'
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      //displayCards: [],
      maxPage: 0,
      recentPage: "1", 
      note: "",
      search: ""
    };
  }

  getMaxPage = (numItems) => {
    axios.get('/api/cardPost/getTotalCards')
    .then(res => {
      const totalCards = parseInt(res.data, 10);
      this.setState({ maxPage: Math.round(( totalCards + numItems - 1) / numItems)}); 
    })
    .catch(e => {
      console.log({e, error: e.messsage});
    })
  };

  getPage = (page) => {
    this.getMaxPage(21);
    axios.get('/api/cardPost/getLatestCreate', {
      params: {
        Page: page,
        numItems: 21
      }
    })
    .then(res => {
      this.setState({ 
        cards: res.data,
        recentPage: page,
        note: ""
      });
    })
    .catch(e => {
      console.log({e, error: e.messsage});
    })
  };

  getPageWithSearch = (page, search) => {
    axios.get('/api/cardPost/getLatestCreateWithSearch', {
      params: {
        Page: page,
        numItems: 21,
        search
      }
    })
    .then(res => {
      console.log(res.data);
      if(!_.isEmpty(res.data.hits))
        this.setState({
          cards: res.data.hits,
          maxPage: res.data.nbPages,
          note: "",
          recentPage: page,
        });
      else
        this.setState({
          note: "No post is found! You should try another keyword.",
          cards: ""
        });
    })
    .catch(e => {
      console.log({e, error: e.messsage});
    })
  };

  //https://www.w3schools.com/js/js_comparisons.asp
  handleGo = (event, newPage) => {
    console.log(newPage);
    console.log(this.state.search);
    if(this.state.search==="") 
      Router.push(`/?page=${newPage}`, `/?page=${newPage}`, { shallow: true });
    else 
      Router.push(
        `/?search=${this.state.search}&page=${newPage}`,
        `/?search=${this.state.search}&page=${newPage}`,
        { shallow: true }
      );
  };

  componentCheck = (page, search) => {
    if(search!==undefined) {
      this.setState({ search });
      this.getPageWithSearch(page, search);
    }
    else {
      this.setState({ search: "" });
      if(page!==undefined)
        this.getPage(page);
      else
        this.getPage("1");
    }
    window.scrollTo(0, 0);
  };

  componentDidMount() {
    const { asPath } = this.props.router;
    const parsed = queryString.parse(asPath.substring(1));
    const page = parsed.page;
    const search = parsed.search;

    this.componentCheck(page, search);
  }

  componentDidUpdate(prevProps) {
    const { asPath } = this.props.router;
    const { asPath: prevAsPath } = prevProps.router;
    const parsed = queryString.parse(asPath.substring(1));
    const page = parsed.page;
    const search = parsed.search;

    if(asPath !== prevAsPath) {
      this.componentCheck(page, search);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {
          this.state.note!=="" &&
          <Paper className={classes.paper}>
            <Typography className={classes.note}>
              {this.state.note}
            </Typography>
          </Paper>
        }
        {
          this.state.note==="" &&
          <div>
            <Grid container justify="center" spacing={6} className={classes.arrayCards}>
              {this.state.cards.map(card => (
                <Grid key={card.name} item className={classes.smallGrid}>
                  <CardPost info={card}/>
                </Grid>
              ))}
            </Grid>
            <Pagination 
              onChange={this.handleGo} 
              page={parseInt(this.state.recentPage, 10)} 
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
        }
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Index));
