import React from 'react';
import {Link} from 'react-router-dom';
import {FlexRow} from '../components/flex';
import {MaterialIcon} from '../components/widgets';

import {withStyles} from "@material-ui/core/styles";
import {Container, Typography, IconButton} from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: '10px 30px',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '100',
  },
  flex: {
    alignItems: 'center',
    height: '58px',
  },
});

class Header extends React.Component {
  render() {
    const {classes} = this.props
    return(
      <Container className={classes.root} elevation={0}>
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
      </Container>
    );
  }
}

export default withStyles(styles)(Header);