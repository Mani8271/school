import API from "../../../../API/API";
const api = new API();

const endPoint = "StaffDailyAttendance"; // Adjust this based on your backend route

// GET ALL Attendance Records
export const getAllStaffAttendanceApi = async () => {
  try {
    const result = await api.get(`${endPoint}/all-Attendance-data`);
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ADD Attendance Record
export const addStaffAttendanceApi = async (payload) => {
  try {
    const result = await api.post(`${endPoint}/add-attendance`, payload);
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// UPDATE Attendance Record
export const updateStaffAttendanceApi = async (payload) => {
  try {
    const result = await api.patch(`${endPoint}/update-attendance`, payload);
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// DELETE Attendance Record
export const deleteStaffAttendanceApi = async (id) => {
  try {
    const result = await api.delete(`${endPoint}/delete-attendance`, {
      data: { _id: id }, // ✅ wrapped inside `data` for axios DELETE request with body
    });
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};
