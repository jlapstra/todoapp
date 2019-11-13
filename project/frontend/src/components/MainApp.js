import React, { Component } from "react";
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import Lists from './Lists';
import CompletedItems from './CompletedItems';
import DataProvider from './DataProvider';


class MainApp extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Container className="headerBar">
            <Navbar expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#/">Home</Nav.Link>
                  <Nav.Link href="#/complete">Completed Todos</Nav.Link>
                </Nav>
                <Nav>
                  <NavDropdown title={ this.props.data.user.username } id="basic-nav-dropdown">
                    <NavDropdown.Item href="account/logout">Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
          <div className="routeContent">
            <Route exact path="/" component={() => <Lists data={ this.props.data.lists } /> }/>
            <Route exact path="/complete" component={() => <CompletedItems lists={ this.props.data.lists } />}/>
          </div>
        </div>
      </HashRouter>
    );
  }
};

export default MainApp;
