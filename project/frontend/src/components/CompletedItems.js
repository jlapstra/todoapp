import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';

import SimpleItem from './SimpleItem';

class CompletedItems extends Component {

  get_completed = () => {
    var completed = [];
    if (Object.keys(this.props.lists).length !=0) {
      this.props.lists.map((list, listIndex) => {
        completed.push.apply(completed, list.completed_items);
      });
    }
    console.log(completed);
    return completed;
  };

  render() {
        const completed = this.get_completed();
        if (Object.keys(completed).length !=0) {
          return (
            <CardDeck>
            { completed.map((item, itemIndex) => {
              return <SimpleItem key={itemIndex} title={item.title} detail={item.detail} priority={item.priority_level}/>
            })}
            </CardDeck>
          );
        }
        return null;
   };
}

export default CompletedItems;
