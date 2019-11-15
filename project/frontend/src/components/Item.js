import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Moment from 'react-moment';

import DateTimePicker from 'react-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheckSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import classNames from 'classnames';
import Cookies from 'js-cookie';

class Item extends Component {
  state = {
    show: false,
    title: this.props.title ,
    detail: this.props.detail,
    priority_level: this.props.priority,
    due_date: new Date(this.props.due),
    completed: false
  }

  handleClose = () => {
    this.setState({show: false});
  };

  handleShow = () => {
    this.setState({show: true});
  };


  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value });
  };

  handleDateChange = date => {
    this.setState({"due_date": date});
  };

  handleSubmit = e => {
    e.preventDefault()
    var csrftoken = Cookies.get('csrftoken');
    const form = {
      id: this.props.id,
      title: this.state.title,
      detail: this.state.detail,
      priority_level: this.state.priority_level,
      due_date: this.state.due_date,
      completed: this.state.completed
    };
    const conf = {
      method: "put",
      body: JSON.stringify(form),
      headers: new Headers({ "Content-Type": "application/json", "X-CSRFToken": csrftoken })
    };
    fetch('/api/updateItem/', conf).then( () => {
      this.handleClose();
      window.location.reload();
    })
  };

  markComplete = e => {
    e.preventDefault();
    var csrftoken = Cookies.get('csrftoken');
    const form = {
      'id': this.props.id
    };
    const conf = {
      method: "put",
      body: JSON.stringify(form),
      headers: new Headers({ "Content-Type": "application/json", "X-CSRFToken": csrftoken })
    };
    fetch('/api/markComplete/', conf).then( () => {
      window.location.reload();
    });
  };

  deleteItem = e => {
    e.preventDefault();
    var csrftoken = Cookies.get('csrftoken');
    const form = {
      'id': this.props.id
    };
    const conf = {
      method: "delete",
      body: JSON.stringify(form),
      headers: new Headers({ "Content-Type": "application/json", "X-CSRFToken": csrftoken })
    };
    fetch('/api/deleteItem/', conf).then( () => {
      window.location.reload();
    });
  };

  render() {

    //https://github.com/JedWatson/classnames
    const priority = this.props.priority;
    var cardClass = classNames({
      'primary': priority == 'P4',
      'secondary': priority == 'P3',
      'warning': priority == 'P2',
      'danger': priority == 'P1',
    });

    const listStyle = {
      padding: '15px 0px 15px 0px',
    };

    return (
      <>
      <ListGroup.Item style={listStyle}>
        <Card border={cardClass}>
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>{this.props.detail}</Card.Text>
            <ButtonGroup>
              <Button variant={cardClass} onClick={this.handleShow}><FontAwesomeIcon icon={faEdit} /></Button>
              <Button variant={cardClass} onClick={this.markComplete}><FontAwesomeIcon icon={faCheckSquare} /></Button>
              <Button variant={cardClass} onClick={this.deleteItem}><FontAwesomeIcon icon={faTrashAlt} /></Button>
            </ButtonGroup>
          </Card.Body>
          <Card.Footer>
            <Moment format='D MMM YYYY HH:mm' withTitle>
            {this.props.due}
            </Moment>
          </Card.Footer>
        </Card>
      </ListGroup.Item>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" onChange={this.handleChange} value={this.state.title} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control as="textarea" rows="2" name="detail" onChange={this.handleChange} value={this.state.detail} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" name="priority_level" onChange={this.handleChange}>
                <option>Priority...</option>
                <option value="P1">Urgent</option>
                <option value="P2">Important</option>
                <option value="P3">Normal</option>
                <option value="P4">Low</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <DateTimePicker onChange={this.handleDateChange} value={this.state.due_date} />
            </Form.Group>
            <Form.Group>
              <Form.Check label="Completed" name="completed" onChange={this.handleChange} value={this.state.completed} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Update Item
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
}

export default Item;
