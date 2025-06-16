import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import {
  GetAllLeaveRequestsInitiate,
  UpdateLeaveRequestInitiate,
  DeleteLeaveRequestInitiate,
} from "../redux/actions/staff/teachingstaff/staffLeaveRequestsAction";
import Loader from "../Components/loader";

const LeaveRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access leave requests, loading, and error from Redux state
  const { leaveRequestsList, loading, error } = useSelector(
    (state) => state.leaveRequestsData
  );
  console.log("Leave Requests Data:", leaveRequestsList);

  // Local state for filters and paginationa
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  // Fetch leave requests on component mount
  useEffect(() => {
    dispatch(GetAllLeaveRequestsInitiate());
  }, [dispatch]);

  // Handle status change (dispatch update action with callback)
  const handleStatusChange = (id, newStatus) => {
    const updatedRequest = leaveRequestsList.find((request) => request._id === id);
    if (updatedRequest) {
      dispatch(
        UpdateLeaveRequestInitiate(
          {
            ...updatedRequest,
            status: newStatus,
          },
          (success) => {
            if (success) {
              dispatch(GetAllLeaveRequestsInitiate()); // Refresh the list after update
          
            }
          }
        )
      );
    }
  };

  // Handle delete (dispatch delete action with callback)
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this leave request?"
    );
    if (isConfirmed) {
      dispatch(
        DeleteLeaveRequestInitiate(id, (success) => {
          if (success) {
            dispatch(GetAllLeaveRequestsInitiate()); // Refresh the list after deletion
          }
        })
      );
    }
  };

  // Filter leave requests based on search criteria
const filteredRequests = leaveRequestsList.filter((entry) => {
  return (
    entry.staffType === "Teaching" && // ✅ Only Teaching staff
    (entry.name?.toLowerCase().includes(searchName.toLowerCase()) ||
     entry.role?.toLowerCase().includes(searchName.toLowerCase())) &&
    (searchType ? entry.leaveType === searchType : true) &&
    (searchStatus ? entry.status === searchStatus : true)
  );
});

  console.log("Filtered Requests:", filteredRequests);

  // Pagination logic
  const totalEntries = filteredRequests.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const displayedEntries = filteredRequests.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Handle pagination
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Loading and error handling
  if (loading) {
   <Loader/>
  }



  return (
    <div className="p-6 bg-gray-100" style={{ height: "90vh" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:text-gray-900 font-semibold mb-4"
      >
        <IoArrowBack className="mr-2 text-2xl" />
        Back
      </button>

      <h1 className="mb-4 text-3xl font-bold">Staff Leave Requests</h1>

      {/* Filters */}
      <div className="p-4 mb-4 bg-white rounded shadow">
        <input
          type="text"
          placeholder="Search Name or Role"
          className="p-2 mr-2 border rounded"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="p-4 bg-white rounded shadow">
        <div className="overflow-x-auto overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">From</th>
                <th className="p-2 border">To</th>
                <th className="p-2 border">No. of Days</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
             {displayedEntries.length > 0 ? (
  displayedEntries.map((entry) => (
    <tr key={entry._id}>
      <td className="p-2 border">
        <strong>{entry.name}</strong>
        <div className="text-sm text-gray-500">{entry.role}</div>
      </td>
      <td className="p-2 border">{entry.leaveType}</td>
      <td className="p-2 border">{new Date(entry.startDate).toLocaleDateString()}</td>
      <td className="p-2 border">{new Date(entry.endDate).toLocaleDateString()}</td>
      <td className="p-2 border">{entry.Days}</td>
      <td className="p-2 border">{entry.purpose}</td>
      <td className="p-2 border">
        <select
          value={entry.status}
          onChange={(e) => handleStatusChange(entry._id, e.target.value)}
          className="p-1 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
      <td className="p-2 border">
        <button
          onClick={() => handleDelete(entry._id)}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td className="p-2 text-center border" colSpan="8">
      No leave requests found.
    </td>
  </tr>
)}

            
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 font-semibold">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaveRequests;