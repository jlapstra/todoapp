import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Cookies from 'js-cookie';

class AddList extends Component {

  state = {
    show: false,
    title: ""
  }

  handleShow = () => {
    this.setState({'show': true});
  };

  handleClose = () => {
    this.setState({'show': false});
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault()
    var csrftoken = Cookies.get('csrftoken');
    console.log(this.props.id);
    const form = {
      title: this.state.title
    };
    const conf = {
      method: "post",
      body: JSON.stringify(form),
      headers: new Headers({ "Content-Type": "application/json", "X-CSRFToken": csrftoken })
    };
    fetch('/api/todolists/', conf).then( () => {
      this.handleClose();
      window.location.reload();
    });
  };

  render() {
    return (
        <>
          <Card>
            <Card.Body>
              <Button variant="primary" onClick={ this.handleShow } block>Add List</Button>
            </Card.Body>
          </Card>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" onChange={this.handleChange} value={this.state.title} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleSubmit}>
                Add List
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
  }
}

export default AddList;
