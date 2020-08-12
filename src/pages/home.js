import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Button, Grid, Paper} from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: '68px',
    height: '90vh',
    width: '100%',
  }
});
class Home extends React.Component {

  render() {
    const {classes} = this.props;
    return(
      <div>
        <Grid container spacing={3} className={classes.root} justify="center" alignItems="center">
          <Grid item>
            <Paper align="center" elevation={0}>
              <Button variant="outlined" color="primary" size="large"
                onClick={this.handleButtonClick}>
                상품목록 보기
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  handleButtonClick = () => {
    const {history} = this.props;
    history.push('/products');
  }
}

export default withStyles(styles)(Home);