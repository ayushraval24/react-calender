import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import Table from "react-bootstrap/Table";
import moment from "moment";
import Swal from "sweetalert2";

export default function EventPreviewModalComponent(props) {
  const {
    isOpen,
    toggle,
    deleteCalenderEvent,
    updateCalenderEvent,
    toggleAddEditEvent,
    passProps,
    categoryData,
  } = props;

  console.log("This is passedProps: ", passProps);

  const startDate = moment(passProps?.start);
  const endDate = moment(passProps?.end);

  return (
    <div>
      <Modal show={isOpen} onHide={toggle}>
        <Modal.Header>
          <Modal.Title>{passProps?.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <Card style={{ width: "100%" }}> */}
          <ListGroup variant="flush">
            <ListGroup.Item className="row w-100">
              <b className="col-4 ">Category: </b>
              <span className="col-8">{passProps?.category?.name}</span>
            </ListGroup.Item>
            <ListGroup.Item className="row w-100">
              <b className="col-4">Start: </b>
              <span className="col-8">
                {startDate.format("DD MMM, YYYY hh:mm:ss a")}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="row w-100">
              <b className="col-4">End: </b>
              <span className="col-8">
                {endDate.format("DD MMM, YYYY hh:mm:ss a")}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="row w-100">
              <b className="col-4">Description: </b>
              <span className="col-8">{passProps?.description}</span>
            </ListGroup.Item>
          </ListGroup>
          {/* </Card> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              toggleAddEditEvent(passProps);
            }}
          >
            Edit
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteCalenderEvent(passProps?._id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
