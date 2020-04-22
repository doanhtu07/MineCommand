import React from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles(theme => ({
    gridItems: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
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
    smallImagesBorder2: {
        borderColor: '#74bcffbd',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '5px',
        boxShadow: '0px 0px 5px #c0daff',
    },
}));

export default function ImageItem(props) {
    const classes = useStyles();
    const { info: photo, onSelect, selected } = props;

    return (
        <GridListTile
            className={classes.gridItems}
            cols={1}
        >
            <ButtonBase 
                onClick={onSelect} 
                className={clsx(classes.smallImagesBorder, {
                    [classes.smallImagesBorder2]: selected 
                })}
            >
                <img 
                    className={classes.smallImages} 
                    src={photo.url}
                />
            </ButtonBase>
        </GridListTile>
    );
}