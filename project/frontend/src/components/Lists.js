import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

import Cookies from 'js-cookie';
import TodoList from './TodoList';
import AddList from './AddList';

class Lists extends Component {
  render() {
    if (Object.keys(this.props.data).length != 0) {
      return (
        <CardDeck>
          { this.props.data.map((list, listIndex) => {
            return <TodoList key={ listIndex } id={list.id} title={ list.title } items={ list.items } />
          }) }
          <AddList />
        </CardDeck>
      );
    }
    return (
      <CardDeck>
        <AddList />
      </CardDeck>
    );
  }
}

export default Lists;
