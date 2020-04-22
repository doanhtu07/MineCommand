import React, { useState } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AvatarEditor from 'react-avatar-editor';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import RotateLeftRoundedIcon from '@material-ui/icons/RotateLeftRounded';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 5
    },
    toolGrid: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5
    },
    toolGridItems: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarEditor: {
        borderWidth: '2px',
        borderStyle: 'solid',
    },
    zoom: {
        marginRight: '8px'
    },
}));

export default function AvatarCanvas(props) {
    const classes = useStyles();
    const { photos, selectedId } = props;

    const [zoomValue, setZoomValue] = useState(1);
    const changeZoom = (event, newValue) => {
        setZoomValue(newValue);
    }

    const [rotate, setRotate] = useState(0);
    const clickRotate = () => {
        setRotate(rotate-90);
    }

    const clickReset = () => {
        setZoomValue(1);
        setRotate(0);
    }

    return (
        <Grid item xs={12} className={classes.root}>
            <AvatarEditor
                className={classes.avatarEditor}
                ref={props.photoEditorChange}
                crossOrigin="anonymous"
                image={
                    photos[
                        photos.findIndex(
                            photo => photo.id===selectedId
                        )
                    ].url
                }
                width={150}
                height={150}
                border={20}
                borderRadius={95}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={zoomValue}
                rotate={rotate}
            />
            <Grid container className={classes.toolGrid}>
                <Grid item xs={4} className={classes.toolGridItems}>
                    <Typography className={classes.zoom}>
                        Zoom
                    </Typography>
                    <Slider 
                        value={zoomValue} 
                        onChange={changeZoom} 
                        min={1}
                        step={0.05}
                        max={5}
                    />
                </Grid>
                <Grid item xs={4} className={classes.toolGridItems}>
                    <Button onClick={clickRotate}>
                        <Typography>
                            Rotate
                        </Typography>
                        <RotateLeftRoundedIcon/>
                    </Button>
                </Grid>
                <Grid item xs={4} className={classes.toolGridItems}>
                    <Button onClick={clickReset}>
                        <Typography>
                            Reset
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}