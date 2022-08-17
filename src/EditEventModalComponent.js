import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DateTimePicker from "react-datetime-picker";

export default function EditEventModalComponent(props) {
  const {
    isOpen,
    toggle,
    categoryData,
    passedProps,
    updateCalenderEvent,
    setEventPreviewModal,
  } = props;

  useEffect(() => {
    setEventPreviewModal(false);
  }, []);

  const [inputValues, setInputValues] = useState({
    id: passedProps?._id,
    title: passedProps?.title,
    description: passedProps?.description,
    start: new Date(passedProps?.start),
    end: new Date(passedProps?.end),
    category: passedProps?.category,
  });

  const changehandler = (e) => {
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

  const editEvent = () => {
    const newEvent = {
      title: inputValues?.title,
      description: inputValues?.description,
      category: inputValues?.category,
      start: new Date(inputValues?.start),
      end: new Date(inputValues?.end),
    };

    console.log("New event: ", newEvent);

    updateCalenderEvent(newEvent, inputValues?.id);

    toggle();
  };

  return (
    <div>
      <Modal show={isOpen} onHide={toggle}>
        <Modal.Header>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Event Title"
                onChange={changehandler}
                name="title"
                defaultValue={inputValues?.title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Select
                aria-label="Default select example"
                onChange={changehandler}
                name="category"
                defaultValue={inputValues?.category?.name}
              >
                <option>Select Category</option>
                {categoryData.map((cat) => (
                  <option key={cat?._id} value={cat?._id}>
                    {cat?.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <DateTimePicker
                onChange={startDateHandler}
                name="start"
                value={inputValues?.start}
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <DateTimePicker
                onChange={endDateHandler}
                name="end"
                value={inputValues?.end}
                className="form-control"
              />
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
                defaultValue={inputValues?.description}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
          <Button variant="primary" onClick={editEvent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
