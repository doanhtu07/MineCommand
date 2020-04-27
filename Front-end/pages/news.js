import React, {Component} from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CardBar from '../components/CardBar';

const styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        backgroundColor: theme.getColor("paper"),
        transition: theme.transitions.create(['background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: 425,
        }),
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    news: {
        fontSize: 'x-large',
        fontWeight: 'bolder',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subNews: {
        fontSize: 'medium',
        fontWeight: 'bolder',
        marginTop: '8px',
        marginBottom: '16px'
    },
    smallGrid: {
        maxWidth: 'fit-content',
        height: 'fit-content'
    },
    arrayCards: {
        marginBottom: '8px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }, 
    subTitle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
});

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    componentDidMount() {
        //axios.get để tìm 6 post created gần đây nhất
        axios.get('/api/cardPost/getLatestEdit')
        .then(res => {
            this.setState({ cards: res.data });
        })
    }

    render() {
        const { classes } = this.props; 

        return (
            <Paper className={classes.root}>
                <Typography className={classes.news}>
                    NEWS
                </Typography>
                <div className={classes.subTitle}>
                    <Typography className={classes.subNews}>
                        Latest Edited Posts
                    </Typography>
                </div>
                <div>
                    <Grid container spacing={4} className={classes.arrayCards}>
                        {this.state.cards.map(card => (
                            <Grid item xs={8} sm={5} md={4} key={card.id} className={classes.smallGrid}>
                                <CardBar info={card}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(News);