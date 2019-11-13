import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import Item from './Item';

class Items extends Component {
  render() {
    if (Object.keys(this.props.items).length != 0) {
        return (
          <ListGroup>
            { this.props.items.map((item, i) => {
              return <Item
                    key={i}
                    id={item.id}
                    title={item.title}
                    detail={item.detail}
                    priority={item.priority_level}
                    due={item.due_date}
                    completed={item.completed}
                  />
            }) }
          </ListGroup>
        )
    }
    return null;
  }
}

export default Items;
