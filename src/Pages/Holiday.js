import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Modal, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useBranch } from "../Pages/Branches"; // Import branch selection
import { AddHolidayInitiate } from "../redux/actions/holiday/addHolidayAction";
import { useDispatch, useSelector } from "react-redux";
import { getHolidayInitiate } from "../redux/actions/holiday/getHolidayAction";
import { updateHolidayInitiate } from "../redux/actions/holiday/updateHolidayAction";
import { deleteHolidayInitiate } from "../redux/actions/holiday/deleteHolidayAction";

const Holidays = () => {
  const { selectedBranch } = useBranch(); // Get the selected branch
  const dispatch = useDispatch(); // Import useDispatch from react-redux
  const  holidays  = useSelector((state) => state.getholidays?.holidays?.data ||[]); // Get holidays from the Redux store
 

  const [showModal, setShowModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    description: "",
  });

  const [events, setEvents] = useState({});
  const toDateKey = (dateString) => new Date(dateString).toISOString().split("T")[0];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    dispatch(getHolidayInitiate());
  }, [dispatch]);
  useEffect(() => {
    
    if (Array.isArray(holidays) && holidays.length > 0) {
      
      const updatedEvents = {};
      holidays.forEach((holiday) => {
      
        const formattedDate = toDateKey(holiday.date);
        if (formattedDate) {
        
          updatedEvents[formattedDate] = {
            _id: holiday._id, 
            name: holiday.name,
            date: holiday.date,
            description: holiday.description,
          };
        }
      });
      setEvents(updatedEvents);
      console.log(events, "events");
    }
  }, [holidays]);
  
  
  useEffect(() => {
    console.log("Updated events state:", events);
  }, [events]);

  const formatDate = (year, month, day) => {
    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  };

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month + 1, 0);
    const totalDays = date.getDate();
    const startDay = new Date(year, month, 1).getDay();
    return { totalDays, startDay };
  };

  // const handleEventSubmit = () => {
  //   if (!eventDetails.name || !eventDetails.date || !eventDetails.description) {
  //     console.error("All fields are required!");
  //     return;
  //   }

  //   const eventKey = selectedDate || eventDetails.date;
  //   setEvents({
  //     ...events,
  //     [eventKey]: {
  //       ...eventDetails,
  //       branch: selectedBranch, // ✅ Assign event to selected branch
  //     },
  //   });

  //   setShowModal(false);
  //   setEventDetails({ name: "", date: "", description: "" });
  //   setSelectedDate(null);
  // };

  const handleEventSubmit = () => {
    if (!eventDetails.name || !eventDetails.date || !eventDetails.description) {
      console.error("All fields are required!");
      return;
    }
  
    const eventKey = selectedDate || eventDetails.date;
  
    const holidayPayload = {
      ...eventDetails,
      date: eventKey,
    };
  
    if (eventDetails._id) {
      
      dispatch(updateHolidayInitiate(holidayPayload));
    } else {
   
      dispatch(AddHolidayInitiate(holidayPayload));
    }
  
    setShowModal(false);
    setEventDetails({ name: "", date: "", description: "" });
    setSelectedDate(null);
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
 
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleEventClick = (date) => {
    setSelectedDate(date);
    if (events[date]) {
      setEventDetails({
        ...events[date],
        date: toDateKey(events[date].date),
        _id: events[date]._id, // Include ID for updates
      });
    } else {
      setEventDetails({ name: "", date: date, description: "" });
    }
    setShowModal(true);
  };

  const handleDeleteHoliday = () => {
    if (eventDetails._id) {
      console.log("Deleting holiday with ID:", eventDetails._id);
      dispatch(deleteHolidayInitiate(eventDetails._id));
      setShowModal(false);
      setEventDetails({ name: "", date: "", description: "" });
      setSelectedDate(null);
    }
  };
  
  
  const { totalDays, startDay } = getDaysInMonth(currentMonth, currentYear);
  const daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  return (
    <div className="p-0" style={{ maxHeight: "90vh" }}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-5">Holidays</h1>
        <Button
          color="primary"
          title="add holiday"
          onClick={() => setShowModal(true)}
        >
          <AddIcon style={{ fontSize: "30px", marginRight: "8px" }} />
        </Button>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-lg max-h-[calc(100vh-150px)] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={goToPreviousMonth} className="text-xl">
            <FaArrowLeft />
          </button>
          <span className="text-xl font-semibold">{`${monthName} ${currentYear}`}</span>
          <button onClick={goToNextMonth} className="text-xl">
            <FaArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-semibold">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startDay }).map((_, idx) => (
            <div key={idx}></div>
          ))}

          {daysInMonth.map((day) => {
            const eventKey = formatDate(currentYear, currentMonth + 1, day);
            const event = events[eventKey];

            if (event ) {
              console.log("Event:", event);
              return (
                <div
                  key={day}
                  onClick={() => handleEventClick(eventKey)}
                  className="relative h-24 p-2 border border-gray-300 rounded-lg cursor-pointer md:h-32 hover:shadow-md"
                >
                  <span className="absolute text-sm font-bold text-gray-800 top-1 right-2">
                    {day}
                  </span>

                  <div className="h-16 mt-4 overflow-y-auto text-sm text-center text-gray-700">
                    <strong>{event.name}</strong>
                    <p>{event.description}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={day}
                  className="relative h-24 p-2 border border-gray-300 rounded-lg md:h-32"
                >
                  <span className="absolute text-sm font-bold text-gray-800 top-1 right-2">
                    {day}
                  </span>
                </div>
              );
            }
          })}
        </div>
      </div>
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEventDetails({
            name: "",
            date: "",
            description: "",
          });
          setSelectedDate(null);
        }}
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto space-y-6">
            {/* Modal Title */}
            <h2 className="text-2xl font-semibold">
              {selectedDate ? "Edit Holiday" : "Add Holiday"}
            </h2>

            {/* Form Section */}
            <form className="space-y-4">
              <TextField
                label="Holiday Name"
                variant="outlined"
                fullWidth
                name="name"
                value={eventDetails.name}
                onChange={handleInputChange}
              />
              <TextField
                label="Date"
                variant="outlined"
                type="date"
                fullWidth
                name="date"
                value={eventDetails.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                name="description"
                value={eventDetails.description}
                onChange={handleInputChange}
              />

              {/* Button Section */}
              <div className="flex justify-end gap-4">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                {eventDetails._id && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteHoliday}
                >
                  Delete
                </Button>
              )}

                <Button onClick={handleEventSubmit} variant="contained">
                  Save Holiday
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Holidays;