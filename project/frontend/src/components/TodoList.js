import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import DateTimePicker from 'react-datetime-picker';

import Cookies from 'js-cookie'

import Items from './Items';
import AddItem from './AddItem';

class TodoList extends Component {
  state = {
    show: false,
    title: "",
    detail: "",
    priority_level: "",
    due_date: new Date(),
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
    console.log(this.props.id);
    const form = {
      title: this.state.title,
      detail: this.state.detail,
      priority_level: this.state.priority_level,
      due_date: this.state.due_date,
      completed: this.state.completed,
      todo_list: this.props.id
    };
    const conf = {
      method: "post",
      body: JSON.stringify(form),
      headers: new Headers({ "Content-Type": "application/json", "X-CSRFToken": csrftoken })
    };
    fetch('/api/createItem/', conf).then( () => {
      this.handleClose();
      window.location.reload();
    })
  };

  render() {
    const cardStyle= {
      minWidth: '300px',
      marginBottom: '20px',
    };

    return (
        <>
          <Card style={cardStyle}>
            <Card.Header>{ this.props.title }</Card.Header>
            <ListGroup>
              <Items items={this.props.items} />
            </ListGroup>
            <Card.Footer>
              <Button variant="primary" onClick={this.handleShow} block>Add Item</Button>
            </Card.Footer>
          </Card>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Item to { this.props.title }</Modal.Title>
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
                Add Item
              </Button>
            </Modal.Footer>
          </Modal>
        </>
    );
  }
}

export default TodoList;
