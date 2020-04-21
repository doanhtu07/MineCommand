import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';

const useStyles = makeStyles(theme => ({
    card: {
        width: '300px',
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
    subtitle1: {
        fontSize: 'smaller',
    },
    subtitle2: {
        fontSize: 'xx-small',
    },
    divideTitle: {
        marginBottom: '8px',
    },
    shareButton: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.getColor("primary"),
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    like: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minWidth: '67.19px',
        fontWeight: 'bold',
    },
    share: {
        fontWeight: 'bold'
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
                src={cardInfo.image? cardInfo.image:'/creationPlaceHolder.png'}
                title={cardInfo.name}
                />
                <CardContent>
                    <Typography component="h6" className={classes.letter}>
                        {cardInfo.name}
                    </Typography>
                    <Typography gutterBottom className={classes.subtitle1}>
                        Created by {cardInfo.author.name}
                    </Typography>
                    <Typography gutterBottom className={classes.subtitle2}>
                        Last edited: {handleDate(cardInfo.updatedAt)}
                    </Typography>
                    <Divider className={classes.divideTitle}/>
                    <Typography gutterBottom component="h6" className={classes.letter}>
                        Description:
                    </Typography>
                    <Typography gutterBottom component="h6">
                        {cardInfo.description}
                    </Typography>
                    <Typography component="h6" className={classes.letter}>
                        {cardInfo.type} 
                    </Typography>
                    <Typography component="h6" className={classes.letter}>
                        {cardInfo.subType} 
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div className={classes.likeAndShareShow}>
                <Typography className={classes.like}>
                    <ThumbUpAltRoundedIcon/> 
                    {cardInfo.likes}
                </Typography>
                <Typography className={classes.share}>
                    Shares: {cardInfo.shares}
                </Typography>
            </div>
            <Button variant="contained" className={classes.shareButton} fullWidth={true}>
                Share
            </Button>
        </Card>
    );
}