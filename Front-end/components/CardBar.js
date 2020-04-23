import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    card: {
        width: '250px',
        backgroundColor: theme.getColor("paper")
    },
    letter: {
        fontWeight: '600',
        fontSize: 'medium',
    },
    likeAndShareShow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: '8px'
    },
    likeAndShareButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#e3f2fd'
    },
    likeAndShareWords: {
        color: '#3f51b5',
    },
    subtitle1: {
        fontSize: 'smaller',
    },
    subtitle2: {
        fontSize: 'xx-small',
    },
    divideTitle: {
        marginBottom: '8px',
    },
    cardMedia: {
        backgroundColor: theme.getColor("cardMedia")
    },
}));
    
export default function CardPost(props) {
    const classes = useStyles();

    const cardInfo = props.info;

    const handleClick = event => {
        console.log({info: cardInfo});
    };

    const handleDate = (value) => {
        var date = "";
        for(var i=0; i<10; i++) {
            date += value[i];
        }
        return date;
    };

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={cardInfo.name}
                    height="175"
                    className={classes.cardMedia}
                    src={cardInfo.image? cardInfo.image:'/creationPlaceHolder.png'}
                    title={cardInfo.name}
                />
                <CardContent>
                    <Typography component="h6" className={classes.letter} noWrap={true}>
                        {cardInfo.name}
                    </Typography>
                    <Typography gutterBottom className={classes.subtitle1} noWrap={true}>
                        Created by {cardInfo.author.name}
                    </Typography>
                    <Typography gutterBottom className={classes.subtitle2} >
                        Last edited: {handleDate(cardInfo.updatedAt)}
                    </Typography>
                    <Divider className={classes.divideTitle}/>
                    <Typography component="h6" className={classes.letter}>
                        {cardInfo.type}
                    </Typography>
                    <Typography component="h6" className={classes.letter}>
                        {cardInfo.subType}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}