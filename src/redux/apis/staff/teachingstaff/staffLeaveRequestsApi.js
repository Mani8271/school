import API from "../../../../API/API";
const api = new API();

const endPoint = "StaffLeaves"; // Adjust this if your backend uses a different path

export const getAllLeaveRequestsApi = async () => {
  try {
    const result = await api.get(`${endPoint}/all-leaves-data`);
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const addLeaveRequestApi = async (payload) => {
  try {
    const result = await api.post(`${endPoint}/add-leave-approval`, payload);
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const updateLeaveRequestApi = async (payload) => {
  try {
    const result = await api.patch(`${endPoint}/update-leaves`, payload);
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const deleteLeaveRequestApi = async (id) => {
  try {
    const result = await api.delete(`${endPoint}/delete-leaves`, {
     _id: id ,
    });
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};
