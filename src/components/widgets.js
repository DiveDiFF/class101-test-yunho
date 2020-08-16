import React from 'react';
import {Tooltip} from '@material-ui/core';


const MaterialIcon = ({icon, title = '', className, style = {}, onClick = () => {}}) => {
  return (
     <Tooltip title={title}>
      <i className={`material-icons ${className}`} style={style} onClick={onClick}>{icon}</i>
    </Tooltip>
  )
}

export {MaterialIcon}