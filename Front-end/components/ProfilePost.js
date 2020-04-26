import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: theme.getColor("paper"),
        width: '100%',
        width: 283.844,
        height: 490.344,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
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
    description: {
        fontSize: 'small',
        overflowWrap: 'break-word',
    },
    shareButton: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.getColor("primary"),
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        },
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
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
    subTypeChips: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        padding: theme.spacing(1)
    },
    cardAction: {
        flexGrow: 1
    },
}));
    
export default function ProfilePost(props) {
    const classes = useStyles();

    const cardInfo = props.info;

    const handleDate = (value) => {
        var date = "";
        for(var i=0; i<10; i++) {
            date += value[i];
        }
        return date;
    };

    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.cardAction}>
                <CardMedia
                    component="img"
                    alt={cardInfo.name}
                    height="175"
                    src={cardInfo.image? cardInfo.image:'/creationPlaceHolder.png'}
                    title={cardInfo.name}
                />
                <CardContent>
                    <Typography component="h6" className={classes.letter} noWrap={true}>
                        {cardInfo.name}
                    </Typography>
                    <Typography gutterBottom className={classes.subtitle2}>
                        Last edited: {handleDate(cardInfo.updatedAt)}
                    </Typography>
                    <Divider className={classes.divideTitle}/>
                    <Typography gutterBottom component="h6" className={classes.letter}>
                        Description:
                    </Typography>
                    <Typography gutterBottom className={classes.description}>
                        {cardInfo.description.substring(0, 66)}...
                    </Typography>
                    <Typography component="h6" className={classes.letter}>
                        {cardInfo.type} 
                    </Typography>
                </CardContent>
                <div className={classes.subTypeChips}>
                    {
                        cardInfo.subType.map((value) => (
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
                <div className={classes.likeAndShareShow}>
                    <Typography className={classes.like}>
                        <ThumbUpAltRoundedIcon/> 
                        {cardInfo.likes}
                    </Typography>
                    <Typography className={classes.share}>
                        Shares: {cardInfo.shares}
                    </Typography>
                </div>
            </CardActionArea>
            <Button variant="contained" className={classes.shareButton} fullWidth={true}>
                Share
            </Button>
        </Card>
    );
}