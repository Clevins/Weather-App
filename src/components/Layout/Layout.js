import React from 'react';

import Aux from '../../hoc/AuxHoc';
import NavBar from '../Navigation/NavBar/NavBar';

//Functional Component to Define Layout
//Use Auxilery Higher Order Component as wrapping component. 
const Layout = ( props ) => (
  <Aux>
    <NavBar/>
    {props.children}
  </Aux>
)

export default Layout;
