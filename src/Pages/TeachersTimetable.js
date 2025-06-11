import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllTeachersTimetableInitiate,
  AddTeachersTimetableInitiate,
  UpdateTeachersTimetableInitiate,
  DeleteTeachersTimetableInitiate,
} from "../redux/actions/staff/teachingstaff/teachersTimetableActions";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const TeacherTimetable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Match your backend schema exactly
  const initialEntryState = {
    class: "",
    date: "",
    subject: "",
    day: "",
    teacherName: "",
    section: "",
    period1: "",
    period2: "",
    period3: "",
    period4: "",
    period5: "",
    period6: "",
    period7: "",
    startTime: "",
    endTime: "",
  };

  const [newEntry, setNewEntry] = useState(initialEntryState);

  const { timetableList, loading, error } = useSelector(
    (state) => state.teachersTimetableData
  );

  useEffect(() => {
    dispatch(GetAllTeachersTimetableInitiate());
  }, [dispatch]);

  // Safeguard: Ensure timetableList is always an array
  const safeTimetableList = Array.isArray(timetableList)
    ? timetableList
    : timetableList
    ? [timetableList]
    : [];

  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editMode) {
      dispatch(UpdateTeachersTimetableInitiate(newEntry));
    } else {
      dispatch(AddTeachersTimetableInitiate(newEntry));
    }
    setOpenModal(false);
    setNewEntry(initialEntryState);
    setEditMode(false);
  };

  const handleEdit = (entry) => {
    setNewEntry(entry);
    setEditMode(true);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    dispatch(DeleteTeachersTimetableInitiate(id));
  };

  return (
    <Container sx={{ mt: 3 }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:text-gray-900 font-semibold mb-4"
      >
        <IoArrowBack className="mr-2 text-2xl" /> Back
      </button>

      {/* Title */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Teacher Timetable
      </Typography>

      {/* Add Class Button */}
      <Tooltip title="Add New Entry">
        <IconButton color="primary" onClick={() => setOpenModal(true)}>
          <Add />
        </IconButton>
      </Tooltip>

      {/* Add/Edit Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editMode ? "Edit Timetable" : "Add New Timetable"}
          </Typography>

          <TextField
            fullWidth
            label="Class"
            name="class"
            value={newEntry.class || ""}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Date (YYYY-MM-DD)"
            name="date"
            type="date"
            value={newEntry.date || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />

          <TextField
            fullWidth
            select
            label="Day"
            name="day"
            value={newEntry.day || ""}
            onChange={handleChange}
            margin="normal"
          >
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={newEntry.subject || ""}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Teacher Name"
            name="teacherName"
            value={newEntry.teacherName || ""}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Section"
            name="section"
            value={newEntry.section || ""}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Start Time"
            name="startTime"
            type="time"
            value={newEntry.startTime || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />

          <TextField
            fullWidth
            label="End Time"
            name="endTime"
            type="time"
            value={newEntry.endTime || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />

          {Array.from({ length: 7 }).map((_, i) => (
            <TextField
              key={`period${i + 1}`}
              fullWidth
              label={`Period ${i + 1}`}
              name={`period${i + 1}`}
              value={newEntry[`period${i + 1}`] || ""}
              onChange={handleChange}
              margin="normal"
            />
          ))}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            {editMode ? "Update" : "Add"}
          </Button>
        </Box>
      </Modal>

      {/* Timetable Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Start → End</TableCell>
              <TableCell>Periods</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {safeTimetableList.length > 0 ? (
              safeTimetableList.map((entry) => (
                <TableRow key={entry._id}>
                  <TableCell>{entry.day || "N/A"}</TableCell>
                  <TableCell>{entry.class || "N/A"}</TableCell>
                  <TableCell>{entry.teacherName || "N/A"}</TableCell>
                  <TableCell>{`${entry.startTime || ""} → ${
                    entry.endTime || ""
                  }`}</TableCell>
                  <TableCell>
                    {Array.from({ length: 7 })
                      .map((_, i) => entry[`period${i + 1}`])
                      .filter(Boolean)
                      .join(", ") || "None"}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(entry)}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(entry._id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No timetable entries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TeacherTimetable;