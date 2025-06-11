import React, { useState, useEffect } from "react";
import { useBranch } from "../Pages/Branches"; // Branch context
import { useMemo } from "react";
import {Modal,TextField,MenuItem,Select,InputLabel,FormControl,Card,CardContent,Typography,IconButton,Tooltip,Button,Box,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { GetAllClassesInitiate } from "../redux/actions/class/getAllClassesAction";
import { useDispatch, useSelector } from "react-redux";
import { AddSectionInitiate } from "../redux/actions/class/addSectionAction";
import { GetAllSectionsInitiate } from "../redux/actions/class/getAllSectionsAction";
import { UpdateSectionInitiate } from "../redux/actions/class/updateSectionAction";
import { DeleteSectionInitiate } from "../redux/actions/class/deleteSectionAction";
import Loader from "../Components/loader";



const SectionList = () => {
 
  const dispatch = useDispatch();
  const [sections, setSections] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newSection, setNewSection] = useState("");
  const [editingSection, setEditingSection] = useState("");
  const [filteredSections, setFilteredSections] = useState([]);

  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

   const classes = useSelector((state) => state.getclasses.classes || []);
   const sections2 = useSelector((state) => state?.getsections?.sections || []);
   console.log(sections2, "sections2");


 const {loading} = useSelector((s) => s.getsections);
 console.log(loading, "loading");
   
    useEffect(() => {
       dispatch(GetAllClassesInitiate());
       dispatch(GetAllSectionsInitiate());
       
     }, [dispatch]);
const totalPages = Math.ceil(filteredSections.length / entriesPerPage);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
const currentSections = filteredSections.slice(startIndex, endIndex);


 useEffect(() => {
  if (selectedClass) {
    const classSections = sections2
      .filter((sec) => sec.className === selectedClass)
      .map((sec) => ({
        sectionName: sec.sectionName,
        _id: sec._id,
      }));
    setFilteredSections(classSections);
  } else {
    setFilteredSections([]); // Clear when no class is selected
  }
}, [selectedClass, sections2]);


 console.log(filteredSections, "filteredSections")
  const handleAddSection = () => {
    setEditingSection("");
    setNewSection("");
    setOpenModal(true);
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
   setNewSection(section.sectionName); 
    setOpenModal(true);
  };

 // Function to handle deleting a section
  const handleDeleteSection = (sectionId) => {
    console.log(sectionId, "sectionId");
    const isConfirmed = window.confirm("Are you sure you want to delete this section?");
    
    if (isConfirmed) {
      dispatch(DeleteSectionInitiate(sectionId, (success) => {
        if (success) {
         
          dispatch(GetAllSectionsInitiate());
        } else {
          console.error('Failed.');
        }
      }))
    };
    
  };
  

// Function to handle saving a new or edited section
  const handleSaveSection = () => {
    if (!newSection.trim() || !selectedClass) return;
  
    const formData = {
      className: selectedClass,
      sectionName: newSection.trim(),
    };
  
    if (editingSection) {
      // Find the section object from the state to get the _id
      const sectionToUpdate = sections2.find(
        (sec) => sec.sectionName === editingSection && sec.className === selectedClass
      );
  
      if (editingSection && editingSection._id) {
          dispatch(UpdateSectionInitiate(editingSection._id, formData, (success) => {
            if (success) {
              dispatch(GetAllSectionsInitiate());
            } else {
              console.error('Update failed');
            }
          }));
        }

    } else {
      dispatch(AddSectionInitiate(formData, (success) => {
        if (success) {
         
          dispatch(GetAllSectionsInitiate());
        } else {
          console.error('Failed.');
        }
      }))
    }
  
    setOpenModal(false);
  };
  
   if (loading) {
      return <Loader />
    }
  
  

  return (
    <div className="p-6" style={{ height: "90vh" }}>
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h5" className="font-semibold">
         
          section List
        </Typography>
      </div>

      {/* Class Selection & Add Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-full sm:w-96">
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Class</InputLabel>
            <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            label="Select Class"
          >
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls.className}>
                {cls.className}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </div>
        <Tooltip title="Add Section" arrow>
          <IconButton color="primary" onClick={handleAddSection}>
            ➕
          </IconButton>
        </Tooltip>
      </div>

      {/* Entries Selection */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm font-medium text-gray-700">Show Entries:</label>
        <select
          value={entriesPerPage}
          onChange={(e) => {
            setEntriesPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to first page
          }}
          className="px-2 py-1 text-black bg-white border rounded w-[60px]"
        >
          {[3, 5, 10].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>
      {!selectedClass && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography fontSize="20px" color="error">
            Please select a class to show sections.
          </Typography>
        </Box>
      )}

      {/* Display Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {currentSections.map((section, index) => (
          <Card key={index} className="shadow-lg w-full h-[120px]">
            <CardContent>
              <Typography variant="h6" color="textPrimary">
              {section.sectionName}
              </Typography>
              <div className="flex justify-between mt-5">
                <IconButton color="inherit" onClick={() => handleEditSection(section)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => handleDeleteSection(section._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border transition ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
              : "text-gray-900 border-gray-400 hover:bg-gray-100"
          }`}
        >
          Previous
        </Button>

        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border transition ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
              : "text-gray-900 border-gray-400 hover:bg-gray-100"
          }`}
        >
          Next
        </Button>
      </div>

      {/* Add/Edit Section Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="relative p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg w-96">
          <IconButton
            color="inherit"
            onClick={() => setOpenModal(false)}
            style={{ position: "absolute", top: 10, right: 10, color: "black" }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" className="mb-4">
            {editingSection ? "Edit Section" : "Add Section"}
          </Typography>

          <TextField
            label="Section Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
          />

          <div className="flex justify-center mt-4">
            <Button
              variant="contained"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={handleSaveSection}
            >
              {editingSection ? "Update Section" : "Add Section"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SectionList;
