import React from 'react';
import {Paper, Typography} from '@material-ui/core'

class Header extends React.Component {
  render() {
    return(
      <Paper elevation={0} color="black" style={{height: '68px', padding: '10px 30px', position: 'static'}}>
        <Typography component="h1" variant="h5">CLASS101</Typography>
      </Paper>
    );
  }
}

export default Header;