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



const SectionList = () => {
  // const { selectedBranch } = useBranch(); // Get selected branch

  // // Simulated data for different branches
  // const branchData = useMemo(() => ({
  //   "City Branch": {
  //     classes: [{ id: 3, name: "Class 3" }, { id: 4, name: "Class 4" }],
  //     sections: { 3: ["A", "B", "C"], 4: ["A"] },
  //   },
  //   "Main Branch": {
  //     classes: [{ id: 1, name: "Class 1" }, { id: 2, name: "Class 2" }],
  //     sections: { 1: ["A", "B"], 2: ["A", "C"] },
  //   },
   
  // }), []);

  // const [classes, setClasses] = useState([]);
  const dispatch = useDispatch();
  const [sections, setSections] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newSection, setNewSection] = useState("");
  const [editingSection, setEditingSection] = useState("");
  const [filteredSections, setFilteredSections] = useState([]);

  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

   const { data: classes = [] } = useSelector((state) => state?.getclasses?.classes || {});
   const sections2 = useSelector((state) => state?.getsections?.sections?.data || {});

   console.log(sections2, "sections2")
   
    useEffect(() => {
       dispatch(GetAllClassesInitiate());
       dispatch(GetAllSectionsInitiate());
       
     }, [dispatch]);
    

  // useEffect(() => {
  //   if (branchData[selectedBranch]) {
  //     setClasses(branchData[selectedBranch].classes);
  //     setSections(branchData[selectedBranch].sections);
  //     setSelectedClass(""); // Reset selected class when branch changes
  //     setCurrentPage(1); // Reset pagination
  //   }
  // }, [selectedBranch,branchData]);

  const totalPages = Math.ceil((sections[selectedClass] || []).length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentSections = (sections[selectedClass] || []).slice(startIndex, endIndex);
  useEffect(() => {
    if (selectedClass) {
      const classSections = sections2
        .filter((sec) => sec.className === selectedClass)
        .map((sec) => ({
          sectionName: sec.sectionName,
          _id: sec._id,
        }));
      setFilteredSections(classSections);
    }
  }, [selectedClass, sections]);

 console.log(filteredSections, "filteredSections")
  const handleAddSection = () => {
    setEditingSection("");
    setNewSection("");
    setOpenModal(true);
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
    setNewSection(section);
    setOpenModal(true);
  };

  // const handleDeleteSection = (section) => {
  //   setSections((prevSections) => ({
  //     ...prevSections,
  //     [selectedClass]: prevSections[selectedClass].filter((sec) => sec !== section),
  //   }));
  // };

  // const handleDeleteSection = (section) => {
  //   const isConfirmed = window.confirm(`Are you sure you want to delete the section "${section}"?`);
  //   if (isConfirmed) {
  //     setSections((prevSections) => ({
  //       ...prevSections,
  //       [selectedClass]: prevSections[selectedClass].filter((sec) => sec !== section),
  //     }));
  //   }
  // };  
  const handleDeleteSection = (sectionId) => {
    console.log(sectionId, "sectionId");
    const isConfirmed = window.confirm("Are you sure you want to delete this section?");
    
    if (isConfirmed) {
      dispatch(DeleteSectionInitiate(sectionId));
    }
  };
  

  // const handleSaveSection = () => {
  //   if (!newSection.trim()) return;

  //   setSections((prevSections) => {
  //     const updatedSections = { ...prevSections };

  //     if (editingSection) {
  //       updatedSections[selectedClass] = updatedSections[selectedClass].map((sec) =>
  //         sec === editingSection ? newSection : sec
  //       );
  //     } else {
  //       updatedSections[selectedClass] = [...(updatedSections[selectedClass] || []), newSection];
  //     }

  //     return updatedSections;
  //   });

  //   setOpenModal(false);
  // };
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
  
      if (sectionToUpdate && sectionToUpdate._id) {
        dispatch(UpdateSectionInitiate(sectionToUpdate._id, formData));
      } 
    } else {
      dispatch(AddSectionInitiate(formData));
    }
  
    setOpenModal(false);
  };
  
  

  return (
    <div className="p-6" style={{ height: "90vh" }}>
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h5" className="font-semibold">
          {/* Section List - {selectedBranch} */}
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

      {/* Display Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredSections.map((section, index) => (
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
