import React from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
    hide: {
        display: 'none'
    },
    cancel: {
        marginTop: '16px',
        marginRight: '8px',
        padding: theme.spacing(1),
        minHeight: '40px',
        background: theme.palette.text.disabled,
        '&:hover': {
            background: theme.palette.text.disabled,
            opacity: 0.8
        },
    },
    next: {
        marginTop: '16px',
        padding: theme.spacing(1),
        minHeight: '40px',
        background: theme.palette.barButton.main,
        '&:hover': {
            opacity: 0.85
        },
    },
}));

export default function confirmEditAccountField(props) {
    const classes = useStyles();

    return (
        <Grid container direction="column" item xs>
            <Typography variant="body1" gutterBottom>
                {props.title}:
            </Typography>
            <Grid container spacing={1} direction="column" item xs>
                <Grid item xs>
                    <TextField
                        id={props.title}
                        placeholder="Enter your new version..."
                        onMouseEnter={props.MouseEnter}
                        onMouseLeave={props.MouseLeave}
                        type={props.show? 'text' : 'password'}
                        value={!props.edit? props.user : props.state}
                        onChange={props.change}
                        onClick={props.clickEdit}
                        onKeyDown={props.keyDown}
                        helperText={props.note}
                        variant="outlined"
                        error={_.isEmpty(props.note)? false : true} //able to change to true
                        InputProps={{
                            readOnly: !props.edit,
                            endAdornment: (
                                <InputAdornment 
                                    position="end"
                                    className={clsx({
                                        [classes.hide]: !props.hover
                                    })}
                                >
                                    {   
                                        !props.edit &&
                                        <IconButton
                                            onClick={props.clickEdit}
                                            edge="end"
                                        >
                                            <EditRoundedIcon/>
                                        </IconButton>
                                    }
                                    {
                                        props.edit &&
                                        <IconButton
                                            onClick={props.clickVisible}
                                            onMouseDown={props.mouseDown}
                                            edge="end"
                                        >
                                            {   
                                                props.show? 
                                                <Visibility /> : 
                                                <VisibilityOff />
                                            }
                                        </IconButton>
                                    }
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs className={clsx({
                    [classes.hide]: !props.edit
                })}>
                    <TextField
                        id="Confirm"
                        label="Confirm"
                        type={props.show? 'text' : 'password'}
                        value={props.stateConfirm}
                        variant="outlined"
                        helperText={props.note}
                        error={_.isEmpty(props.note)? false : true}
                        onChange={props.changeConfirm}
                    />
                </Grid>
                <Grid item xs>
                    <Button className={clsx(classes.cancel, {
                            [classes.hide]: !props.edit
                        })}
                        onClick={props.closeEdit}
                    >
                        Cancel
                    </Button>   
                    <Button 
                        className={clsx(classes.next, {
                            [classes.hide]: _.isEmpty(props.state) || _.isEmpty(props.stateConfirm)
                        })}
                        onClick={props.save}
                    >
                            Save
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}