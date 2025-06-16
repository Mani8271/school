import API from "../../../../API/API";
const api = new API();

const endPoint = "TeachersTimetable";

export const getAllTeachersTimetableApi = async () => {
  try {
    const result = await api.get(`${endPoint}/teachers-timetable-data`);
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const addTeachersTimetableApi = async (payload) => {
  try {
    const result = await api.post(`${endPoint}/add-teacher-timetable`, payload);
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const updateTeachersTimetableApi = async (payload) => {
  try {
    const result = await api.patch(`${endPoint}/update-teacher-timetable`, payload);
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const deleteTeachersTimetableApi = async (id) => {
  try {
    const result = await api.delete(`${endPoint}/delete-teacher-timetable`, {
      data: { _id: id },
    });
    return result.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};
