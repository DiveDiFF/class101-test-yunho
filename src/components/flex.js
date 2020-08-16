import React from 'react';
import {PropTypes} from 'prop-types';


class FlexRow extends React.Component {
  static propTypes = {
    display: PropTypes.string,
    flexFlow: PropTypes.string,
    alignItems: PropTypes.string,
    alignContent: PropTypes.string,
    justifyContent: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
  }

  static defaultProps = {
    display: 'flex',
    flexFlow: 'space-between',
    alignItems: 'center',
    alignContent: 'stretch',
    justifyContent: 'space-between',
    style: {},
    className: '',
  }

  render() {
    return (
      <div style={{...this.props, ...this.props.style}} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export {FlexRow}