import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

import classNames from 'classnames';


class SimpleItem extends Component {
  render() {
    const priority = this.props.priority;
    var cardClass = classNames({
      'primary': priority == 'P4',
      'secondary': priority == 'P3',
      'warning': priority == 'P2',
      'danger': priority == 'P1'
    });

    return (
      <Card border={cardClass}>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.detail}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default SimpleItem;
