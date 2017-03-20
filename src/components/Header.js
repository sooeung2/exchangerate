import React from 'react';
import AppBar from 'material-ui/AppBar';

const Header = ({title}) => (
  <AppBar
    title={title}
    showMenuIconButton={false}
    titleStyle={{textAlign: 'center'}}
  />
);

export default Header;
