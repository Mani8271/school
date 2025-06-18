import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Tooltip,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useBranch } from "../Pages/Branches";
import { AddBuslistInitiate } from "../redux/actions/schoolbus/buslist/addbuslistAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllBuslistInitiate } from "../redux/actions/schoolbus/buslist/getallbuslistAction";
import { UpdateBuslistInitiate } from "../redux/actions/schoolbus/buslist/updatebuslistAction";
import { DeleteBuslistInitiate } from "../redux/actions/schoolbus/buslist/deletebuslistAction";

const BusList = () => {
  const dispatch = useDispatch();
  const { data: allbuses = [] } = useSelector((state) => state.getallbuslist.buslist || {});
  useEffect(() => {
    dispatch(getAllBuslistInitiate());
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    busNumber: "",
    busModel: "",
    capacity: "",
    status: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesCount, setEntriesCount] = useState(1); // Entries per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
 // Modal Handlers
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditIndex(null);
    setFormData({ busNumber: "", busModel: "", capacity: "", status: "" });
  };

  // Form Input Change Handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save Bus Handler (Create or Update)
  const handleSaveBus = () => {
    if (editIndex !== null) {
      // // Update existing bus
  
      dispatch(UpdateBuslistInitiate(formData, (success) => {
        if (success) {
          dispatch(getAllBuslistInitiate());
          handleCloseModal();
        }
      }))
    } else {
      // Add new bus
      const formdata = {
        busNumber: formData?.busNumber,
        busModel: formData?.busModel,
        capacity: formData?.capacity,
        status: formData?.status,
      }
      dispatch(AddBuslistInitiate(formdata, (success) => {
        if (success) {
          dispatch(getAllBuslistInitiate());
          handleCloseModal();
        }
      }))
    }
  };

  // Edit Bus Handler
  const handleEditBus = (index) => {
    setEditIndex(index);
    setFormData(allbuses?.find((item) => item?._id === index));
    handleOpenModal();
  };

  const handleDeleteBus = (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this bus?");
    const id = allbuses?.find((item) => item?._id === index)
    if (isConfirmed) {
      if (id) {
        dispatch(
          DeleteBuslistInitiate({ _id: id._id }, (success) => {
            if (success) {
              dispatch(getAllBuslistInitiate());
            }
          })
        );
      }
    }
  };

  const filteredBuses = allbuses?.filter((bus) => {
    const lowercasedQuery = searchQuery?.toLowerCase();
    return (
      bus.busNumber.toLowerCase().includes(lowercasedQuery) ||
      bus.busModel.toLowerCase().includes(lowercasedQuery) ||
      bus._id.toLowerCase().includes(lowercasedQuery) ||
      bus.capacity.toLowerCase().includes(lowercasedQuery)
    );
  });

// Pagination logic
  const totalPages = searchQuery ? Math.ceil(filteredBuses.length / entriesCount) : Math.ceil(allbuses.length / entriesCount);
  const startIndex = (currentPage - 1) * entriesCount;
  const endIndex = startIndex + entriesCount;
  const currentBuses = allbuses.slice(startIndex, endIndex);
  const filteredcurrentBuses = filteredBuses.slice(startIndex, endIndex);
 const handleEntriesChange = (e) => {
    setEntriesCount(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when entries per page change
  };

  // Handle Previous and Next Page Navigation
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Bus List</h1>
        <div className="flex items-center">
          <Tooltip title="Add Bus List">
            <Add
              style={{
                cursor: "pointer",
                marginRight: "8px",
                color: "black",
                fontSize: "30px",
              }}
              onClick={handleOpenModal}
            />
          </Tooltip>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-64 mb-4">
        <TextField
          variant="outlined"
          placeholder="Search by BusNumber, model..."
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Show Entries Dropdown */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm font-medium text-gray-700">Show Entries:</label>
        <select
          value={entriesCount}
          onChange={handleEntriesChange}
          className="px-2 py-1 text-black bg-white border rounded w-[50px]"
        >
          {[1, 2, 3, 4].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="max-h-screen overflow-x-auto overflow-y-auto bg-white rounded-lg shadow-md">
        <table className="w-full border border-collapse border-gray-200 table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Bus Number</th>
              <th className="px-4 py-2 border border-gray-300">Bus Model</th>
              <th className="px-4 py-2 border border-gray-300">Capacity</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!searchQuery ? currentBuses.length > 0 ? (
              currentBuses.map((bus, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border border-gray-300">{bus.busNumber}</td>
                  <td className="px-4 py-2 border border-gray-300">{bus.busModel}</td>
                  <td className="px-4 py-2 border border-gray-300">{bus.capacity}</td>
                  <td className="px-4 py-2 border border-gray-300">{bus.status}</td>
                  <td className="flex px-4 py-4 text-center border-b border-gray-300">
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => handleEditBus(bus?._id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteBus(bus?._id)}
                    >
                      <Delete />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-2 text-center border border-gray-300"
                  colSpan="5"
                >
                  No buses found.
                </td>
              </tr>
            ) : null}

            {/* search */}
            {searchQuery ? filteredcurrentBuses.length > 0 ? (
              filteredcurrentBuses?.map((bus, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border border-gray-300">{bus.busNumber}</td>
                  <td className="px-4 py-2 border border-gray-300">{bus.busModel}</td>
                  <td className="px-4 py-2 border border-gray-300">{bus.capacity}</td>
                  <td className="px-4 py-2 border border-gray-300">{bus.status}</td>
                  <td className="flex px-4 py-4 text-center border-b border-gray-300">
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => handleEditBus(bus?._id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteBus(bus?._id)}
                    >
                      <Delete />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="px-4 py-3 text-center text-gray-500">
                  No Bus List found
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border transition ${currentPage === 1
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
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border transition ${currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
            : "text-gray-900 border-gray-400 hover:bg-gray-100"
            }`}
        >
          Next
        </Button>
      </div>

      {/* Modal for Adding/Editing Bus */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="absolute w-3/5 p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2">
          <h2 className="mb-4 text-xl font-bold">
            {editIndex !== null ? "Edit Bus" : "Add New Bus"}
          </h2>
          <form className="grid grid-cols-2 gap-4">
            {/* Bus Number */}
            <TextField
              label="Bus Number"
              name="busNumber"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.busNumber}
              onChange={handleInputChange}
            />
            {/* Bus Model */}
            <TextField
              label="Bus Model"
              name="busModel"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.busModel}
              onChange={handleInputChange}
            />
            {/* Capacity */}
            <TextField
              label="Capacity"
              name="capacity"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.capacity}
              onChange={handleInputChange}
            />
            {/* Status */}
            <TextField
              label="Status"
              name="status"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.status}
              onChange={handleInputChange}
            />
          </form>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="contained"
              color="primary"
              className="mr-4 bg-blue-600"
              onClick={handleSaveBus}
            >
              {editIndex !== null ? "Update" : "Save"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BusList;
