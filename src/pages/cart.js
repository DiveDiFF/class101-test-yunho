import React from 'react';

import {fetchData} from '../actions';
import {Title} from '../components/title';

import {withStyles} from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: '68px',
    height: '90vh',
  },
});
class Cart extends React.Component {
  state = {
    cart : [],
  }

  render() {
    const {classes} = this.props

    return(
      <Paper className={classes.root} elevation={0}>
        <Title title="장바구니" />

      </Paper>
    );
  }
}


export default withStyles(styles)(Cart);