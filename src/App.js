import "./App.css";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import EventPreviewModalComponent from "./EventPreviewModalComponent";
import AddEventModalComponent from "./AddEventModalComponent";
import EditEventModalComponent from "./EditEventModalComponent";

function App() {
  const [categoryData, setCategoryData] = useState([]);
  const [addEventModal, setAddEventModal] = useState(false);
  const [eventPreviewmodal, setEventPreviewModal] = useState(false);
  const [eventPreviewProps, setEventPreviewProps] = useState({});
  const [editEventProps, setEditEventProps] = useState({});
  const [editEventModal, setEditEventModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [isAwaiting, setIsAwaiting] = useState(false);
  const calendarRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => {
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getEvents = async () => {
    await setIsAwaiting(true);
    axios
      .get("http://localhost:5000/events")
      .then((res) => {
        const newArr = res.data.data.map((event) => {
          return {
            id: event._id,
            title: event.title,
            start: event.start,
            end: event.end,
            category: event.category,
            extendedProps: { ...event },
          };
        });
        setEvents(newArr);
        setIsAwaiting(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const toggleAddEvent = (passedProps = {}) => {
    setAddEventModal(!addEventModal);
  };

  const toggleEventPreview = (passedProps = {}) => {
    setEventPreviewProps(passedProps);
    setEventPreviewModal(!eventPreviewmodal);
  };

  const toggleAddEditEvent = (passedProps = {}) => {
    setEditEventModal(!editEventModal);
    setEditEventProps(passedProps);
  };

  const deleteCalenderEvent = (id = "") => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/events/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            getEvents();
            toggleEventPreview();
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
      }
    });
  };

  const updateCalenderEvent = (passedProps = {}, id = "") => {
    axios
      .put(`http://localhost:5000/events/${id}`, passedProps)
      .then((res) => {
        console.log("This is response: ", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    getEvents();
  };

  return (
    <>
      <div style={{ padding: "60px" }}>
        {!isAwaiting && (
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            editable={true}
            headerToolbar={{
              center: "dayGridMonth,timeGridWeek,timeGridDay,today new",
            }}
            customButtons={{
              new: {
                text: "new",
                click: toggleAddEvent,
              },
            }}
            events={events}
            // eventColor="red"
            nowIndicator
            dateClick={(e) => console.log(e.dateStr)}
            eventClick={(e) => toggleEventPreview(e.event._def.extendedProps)}
            ref={calendarRef}
          />
        )}

        {addEventModal && (
          <AddEventModalComponent
            isOpen={addEventModal}
            toggle={toggleAddEvent}
            categoryData={categoryData}
            getEvents={getEvents}
          />
        )}

        {eventPreviewmodal && (
          <EventPreviewModalComponent
            isOpen={eventPreviewmodal}
            toggle={toggleEventPreview}
            deleteCalenderEvent={deleteCalenderEvent}
            updateCalenderEvent={updateCalenderEvent}
            passProps={eventPreviewProps}
            categoryData={categoryData}
            toggleAddEditEvent={toggleAddEditEvent}
          />
        )}

        {editEventModal && (
          <EditEventModalComponent
            isOpen={editEventModal}
            toggle={toggleAddEditEvent}
            togglePreview={toggleEventPreview}
            passedProps={editEventProps}
            categoryData={categoryData}
            updateCalenderEvent={updateCalenderEvent}
            setEventPreviewModal={setEventPreviewModal}
          />
        )}
      </div>
    </>
  );
}

export default App;
