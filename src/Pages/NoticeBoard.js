import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, IconButton, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Edit, Delete, Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search"; // Import SearchIcon
import { debounce } from "lodash"; // Import lodash for debouncing
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useDispatch, useSelector } from "react-redux";
import { GetAllClassesInitiate } from "../redux/actions/class/getAllClassesAction";
import { AddNoticeBoardInitiate } from "../redux/actions/notice/addNoticeBoardAction";
import { getNoticeboardInitiate } from "../redux/actions/notice/getNoticeBoardAction";
import { updateNoticeboardInitiate } from "../redux/actions/notice/updateNoticeBoardAction";
import { deleteNoticeboardInitiate } from "../redux/actions/notice/deleteNoticeBoardAction";
import { MenuItem } from '@mui/material';
import { searchNoticeboardInitiate } from "../redux/actions/notice/searchNoticeBoardAction";
import { BASE_URL } from "../API/Constants";


const NoticeBoard = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false); // For confirmation modal
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  // const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const { data: classes = [] } = useSelector((state) => state?.getclasses?.classes || {});
  // const { data: fetchedNotices = [] } = useSelector((state) => state?.getnoticeboard?.noticeboards || {});
  const fetchedNotices = useSelector((state) => state?.getnotices.noticeboards.data || []);
  console.log("fetchedNotices", fetchedNotices);
const searchResults = useSelector(state => state.searchNoticeboard.data);


  console.log("fetchedNotices", fetchedNotices);
  // const classes = useSelector((state) => state.getclasses.classes) || [];
  console.log("classes", classes);

  useEffect(() => {
    dispatch(GetAllClassesInitiate());
    dispatch(getNoticeboardInitiate());
  }, []);

  
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  // useEffect(() => {
  //   if (fetchedNotices) {
  //     setNotices(fetchedNotices);
  //   }
  // }, [fetchedNotices]);
  const [notices, setNotices] = useState([])

  console.log("notices",notices)

  const [currentNotice, setCurrentNotice] = useState({
    _id: "",
    noticeTitle: "",
    noticeDescription: "",
    noticeDate: new Date(),
    time: new Date(),
    
    noticeImage: null,
  });
  const [noticeToDelete, setNoticeToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 3; // Number of notices per page

  // Debounced search
  const debouncedSearch = debounce(
    (query) => setDebouncedSearchQuery(query),
    500
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel(); // Cleanup on unmount
  }, [searchQuery]);


  const handleOpen = (notice) => {
    if (notice) {
      setCurrentNotice({
        _id: notice._id || "",
        noticeTitle: notice.noticeTitle || "",
        noticeDescription: notice.noticeDescription || "",
        noticeDate: notice.noticeDate ? new Date(notice.noticeDate) : new Date(),
        time: notice.time ? new Date(notice.time) : new Date(),
        className: notice.className || "",
        noticeImage: null, // You don’t have the actual file object from DB
      });
    } else {
      setCurrentNotice({
        _id: "",
        noticeTitle: "",
        noticeDescription: "",
        noticeDate: new Date(),
        time: new Date(),
        className: "",
        noticeImage: null,
      });
    }
  
    setOpen(true);
  };
  
  

  const handleClose = () => setOpen(false);




 
const handleSubmit = (e) => {
  e.preventDefault();
 
 
  const formData = new FormData();
  if(currentNotice && currentNotice._id){
  formData.append("_id", currentNotice._id); 
  }
  formData.append("noticeTitle", currentNotice.noticeTitle);
  formData.append("noticeDescription", currentNotice.noticeDescription);
  formData.append("className", currentNotice.className);
  const date = currentNotice.noticeDate ? new Date(currentNotice.noticeDate) : new Date();
  const time = currentNotice.time ? new Date(currentNotice.time) : new Date();
  formData.append("noticeDate", date.toISOString());
  formData.append("time", time.toISOString());
 if (currentNotice.noticeImage instanceof File) {
  formData.append("noticeImage", currentNotice.noticeImage);
}


  // Log for debugging
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  // Dispatch the appropriate action: Add or Update based on if currentNotice.id exists
  if (currentNotice._id) {
    // Update the notice if an id exists
    // console.log("formupdate",formData)
    // console.log("currentNotice",formData.noticeTitle)
    dispatch(updateNoticeboardInitiate( formData));  // Assuming UpdateNoticeBoardInitiate accepts ID and FormData
  } else {
    // Add a new notice if no id exists
    console.log("formadd",formData)
    dispatch(AddNoticeBoardInitiate(formData));
  }

  // Close the modal after submitting the form
  setOpen(false);
};



  const handleDelete = (id) => {
    console.log("Delete Notice ID:", id);
    setNoticeToDelete(id);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
   dispatch(deleteNoticeboardInitiate(noticeToDelete));
    setDeleteOpen(false);
  };

  const handleFileDelete = (id) => {
    
    setNotices((prevNotices) =>
      prevNotices.map((notice) =>
        notice.id === id ? { ...notice, file: null } : notice
      )
    );
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
  };
console.log("notices", notices)
  // const filteredNotices = fetchedNotices.filter((notice) => {
  //   console.log("Filtering for class:", notice.className, "Selected class:", selectedClass);
  //   return notice.className === selectedClass;
  // });
const noticesToRender = Array.isArray(fetchedNotices) ? fetchedNotices.filter(notice => {
  const matchesSearch = notice.noticeTitle?.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesClass = selectedClass ? notice.className === selectedClass : true;
  return matchesSearch && matchesClass;
}) : [];

const filteredNotices = noticesToRender.filter((notice) => {
  console.log("Filtering for class:", notice.className, "Image:", notice.noticeImage);
  return selectedClass ? notice.className === selectedClass : true;
});

console.log("Filtered Notices:", filteredNotices);


  

useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearchQuery(searchQuery);
  }, 500);

  return () => {
    clearTimeout(handler);
  };
}, [searchQuery]);

  

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Get current notices based on pagination
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

//  useEffect(() => {
//   if (searchQuery || selectedClass) {
//     console.log("Dispatching searchNoticeboardInitiate with query:", searchQuery);
// dispatch(searchNoticeboardInitiate({ searchQuery: searchQuery }));
//   }
// }, [searchQuery, selectedClass, dispatch]);
// useEffect(() => {
//   if (searchQuery) {
//     console.log("Dispatching searchNoticeboardInitiate with query:", searchQuery);
//     dispatch(searchNoticeboardInitiate({ searchQuery }));
//   }
// }, [searchQuery, dispatch]);

// const noticeImageUrl = filteredNotices.noticeImage
//   ? `${BASE_URL}noticefiles/${filteredNotices.noticeImage}`
//   : "https://via.placeholder.com/150"; // fallback image
 const handleDownload = async (filename) => {
  try {
    const response = await fetch(`${BASE_URL}noticeimages/${filename}`, {
      method: 'GET',
      headers: {
        // add auth headers here if needed
      }
    });
    if (!response.ok) throw new Error("Network response was not ok");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;  // specify the filename here
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url); // cleanup

  } catch (error) {
    console.error("Download failed:", error);
  }
};



  return (
    <div className="flex items-center justify-center p-4">
      <div className="container max-w-5xl p-4 md:p-6">
        <h1 className="mt-0 mb-10 text-3xl font-bold text-left">Notice Board</h1>

        {/* Search Bar and Add New Notice Button */}

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Select Class Dropdown */}
          <TextField
            select
            label="Select Class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            fullWidth
            size="small"
            sx={{flex: 1, backgroundColor: "#f5f5f5"}}
          >
            <MenuItem value="">-- Select Class --</MenuItem>
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls.className}>
                {cls.className}
              </MenuItem>
            ))}
          </TextField>


          {/* Search Bar */}
          <TextField
            label="Search Notices"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            size="small" // Match size for alignment
            sx={{
              flex: 2,
              backgroundColor: "#f5f5f5",
            }}
          />

          {/* Add Button */}
          <Button
            onClick={handleOpen}
            color="primary"
            variant="contained"
            sx={{
              minWidth: "48px",
              height: "38px", // Matches small TextField height
              alignSelf: { xs: "stretch", sm: "center" }, // Full width on mobile, centered on larger
              px: 0,
            }}
          >
            <Add sx={{ fontSize: 24 }} />
          </Button>
        </div>



        {/* Displaying Filtered Notices */}
        {filteredNotices.length === 0 ? (
          <div className="mt-10 text-center text-gray-500">
            <p>No notices available. Add a new notice!</p>
          </div>
        ) : (
          <div className="w-full max-w-5xl max-h-[450px] overflow-auto border border-gray-300 p-4 rounded-md shadow-md">
            <div className="grid grid-cols-1 gap-6">
              {currentNotices.map((notice) => (
                <div key={notice._id} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white">
                  <h2 className="font-semibold text-xl mb-2">{notice.noticeTitle}</h2>
                  {/* Scrollable Description */}
                  <div>
                    <p className="text-gray-600">{notice.noticeDescription}</p>
                  </div>

                  {/* File Display with Download & Delete Buttons */}
  {notice.noticeImage && (
  <div className="relative w-32 h-32 mt-2">
    <img
      src={`${BASE_URL}noticeimages/${notice.noticeImage}`}
      alt="Notice"
      className="w-full h-full object-cover border rounded"
    />
    <IconButton
      color="primary"
      aria-label="Download File"
      onClick={() => handleDownload(notice.noticeImage)}
      sx={{
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'rgba(255,255,255,0.7)',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.9)',
        }
      }}
    >
      <DownloadForOfflineIcon />
    </IconButton>
  </div>
)}




                 

                  {/* Actions */}
                  <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
                    <div>
                    <p className="text-xs text-gray-400">
                      {notice.noticeDate && !isNaN(new Date(notice.noticeDate)) ? (
                        <>
                          {new Date(notice.noticeDate).toLocaleDateString()} at {new Date(notice.time).toLocaleTimeString()}
                        </>
                      ) : (
                        "Invalid Date"
                      )}
                    </p>
                    </div>
                    <div>
                      <IconButton onClick={() => handleOpen(notice)} color="primary" aria-label="Edit Notice">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(notice._id)} color="error" aria-label="Delete Notice">
                        <Delete />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Pagination Buttons */}
        <div className="flex flex-wrap justify-between items-center gap-2 mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white font-medium transition ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white font-medium transition ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            Next
          </button>
        </div>

        {/* Modal for Adding/Editing Notices */}
        <Modal open={open} onClose={handleClose}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[85vh]">
              <h2 className="mb-4 text-xl font-semibold text-center">
                {currentNotice.id ? "Edit Notice" : "Add New Notice"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                  select
                  value={currentNotice.className || ""}
                  onChange={(e) =>
                    setCurrentNotice({ ...currentNotice, className: e.target.value })
                  }
                  fullWidth
                  required
                  SelectProps={{ native: true }}
                  sx={{ mt: 2 }}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls.className}>
                      {cls.className}
                    </option>
                  ))}
                </TextField>


                <TextField
                  label="Notice Title"
                  variant="outlined"
                  margin="normal"
                  value={currentNotice.noticeTitle}
                  onChange={(e) => setCurrentNotice({ ...currentNotice, noticeTitle: e.target.value })}
                  required
                  fullWidth
                />
                <TextField
                  label="Notice Description"
                  variant="outlined"
                  margin="normal"
                  value={currentNotice.noticeDescription}
                  onChange={(e) => setCurrentNotice({ ...currentNotice, noticeDescription: e.target.value })}
                  required
                  multiline
                  rows={4}
                  fullWidth
                />
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DesktopDatePicker
                      label="Date"
                      inputFormat="MM/dd/yyyy"
                      value={currentNotice.date}
                      onChange={(newDate) => setCurrentNotice({ ...currentNotice, date: newDate })}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                    <TimePicker
                      label="Time"
                      value={currentNotice.time}
                      onChange={(newTime) => setCurrentNotice({ ...currentNotice, time: newTime })}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </div>
                </LocalizationProvider> */}
                {/* File Upload */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">Attach File</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.jpg,.png"
                    onChange={(e) => setCurrentNotice({ ...currentNotice, noticeImage: e.target.files[0] })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {currentNotice.noticeImage && (
                    <p className="text-sm text-gray-500 mt-2">Selected file: {currentNotice.noticeImage.name}</p>
                  )}
                </div> */}
                <div>
  <label className="block text-sm font-medium text-gray-700">Attach Notice Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      setCurrentNotice({
        ...currentNotice,
        noticeImage: file,
        previewImage: file ? URL.createObjectURL(file) : "",
      });
    }}
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
  />
  {currentNotice.previewImage && (
    <img
      src={currentNotice.previewImage}
      alt="Preview"
      className="mt-2 w-32 h-32 object-cover border rounded"
    />
  )}
</div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                  <Button type="button" onClick={handleClose} variant="outlined" color="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    {currentNotice.id ? "Update Notice" : "Add Notice"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal open={deleteOpen} onClose={cancelDelete}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-lg font-semibold">
                Are you sure you want to delete this notice?
              </h2>
              <div className="flex justify-between gap-2">
                <Button variant="outlined" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button variant="contained" color="error" onClick={confirmDelete}>
                  Confirm Delete
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NoticeBoard;
