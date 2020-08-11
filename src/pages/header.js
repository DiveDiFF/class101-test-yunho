import React from 'react';
import {Link} from 'react-router-dom';
import {FlexRow} from '../components/flex';
import {MaterialIcon} from '../components/widgets';

import {withStyles} from "@material-ui/core/styles";
import {Paper, Typography, IconButton} from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: '10px 30px',
    position: 'static',
  },
  flex: {
    alignItems: 'center',
    height: '58px',
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

class Header extends React.Component {
  render() {
    const {classes} = this.props
    return(
      <Paper className={classes.root} elevation={0} color="black">
        <FlexRow>
          <Link to="/">
            <Typography component="h1" variant="h5">CLASS101</Typography>
          </Link>
          <Link to="/cart">
            <IconButton color="secondary" aria-label="add to shopping cart">
              <MaterialIcon icon="shopping_cart" title="장바구니"/>
            </IconButton>
          </Link>
        </FlexRow>
      </Paper>
    );
  }
}

export default withStyles(styles)(Header);