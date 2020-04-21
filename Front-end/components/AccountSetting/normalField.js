import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function normalAccountField(props) {

    return (
        <Grid item xs>
            <Typography variant="body1" gutterBottom>
                {props.title}:
            </Typography>
            <TextField
                id={props.title}
                //placeholder={user.email}
                value={props.value}
                helperText=""
                error={false} //able to change to true
                InputProps={{
                    readOnly: true
                }}
                variant="outlined"
            />
        </Grid>
    );
}
