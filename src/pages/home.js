import React from 'react';
import {Button, Grid, Paper} from '@material-ui/core';

class Home extends React.Component {

  render() {
    return(
      <div>
        <Grid container spacing={3} style={{height: '500px'}} justify="center" alignItems="center">
          <Grid item xs={12}>
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
    const {history} = this.props
    history.push('/products')
  }
}

export default Home;