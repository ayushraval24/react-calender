import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

export default function AddEventModalComponent(props) {
  const { isOpen, toggle, categoryData, getEvents } = props;

  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    start: null,
    end: null,
    category: "",
  });

  const changehandler = (e) => {
    console.log("This is e: ", e);
    setInputValues((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const startDateHandler = (e) => {
    setInputValues((prevData) => ({
      ...prevData,
      start: e,
    }));
  };

  const endDateHandler = (e) => {
    setInputValues((prevData) => ({
      ...prevData,
      end: e,
    }));
  };

  const addEvent = (e) => {
    const newEvent = {
      title: inputValues.title,
      category: inputValues.category,
      start: new Date(inputValues.start),
      end: new Date(inputValues.end),
      description: inputValues.description,
    };

    axios
      .post("http://localhost:5000/events", newEvent)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getEvents();
    toggle();
  };

  return (
    <div>
      <Modal show={isOpen} onHide={toggle}>
        <Modal.Header>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Event Title"
                onChange={changehandler}
                name="title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Select
                aria-label="Default select example"
                onChange={changehandler}
                name="category"
              >
                <option>Select Category</option>
                {categoryData.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <DateTimePicker
                onChange={startDateHandler}
                name="start"
                value={inputValues.start}
                className="form-control"
              />
              {/* <Form.Control
                type="date"
                placeholder="Date Start"
                onChange={changehandler}
                name="start"
              /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <DateTimePicker
                onChange={endDateHandler}
                name="end"
                value={inputValues.end}
                className="form-control"
              />
              {/* <Form.Control
                type="date"
                placeholder="Date End"
                onChange={changehandler}
                name="end"
              /> */}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Event Description"
                onChange={changehandler}
                name="description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
          <Button variant="primary" onClick={addEvent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
