import API from "../../../../API/API";

const api = new API();

// Base endpoint
const endPoint = "TeachersTimetable";

export const getAllTeachersTimetableApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}/teacher-timetable-data`);
      resolve(result.data);
    } catch (error) {
      reject(error?.response?.data || error.message);
    }
  });
};

export const addTeachersTimetableApi = async (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}/add-teacher-timetable`, payload);
      resolve(result.data);
    } catch (error) {
      reject(error?.response?.data || error.message);
    }
  });
};

export const updateTeachersTimetableApi = async (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}/update-teacher-timetable`, payload);
      resolve(result.data);
    } catch (error) {
      reject(error?.response?.data || error.message);
    }
  });
};

export const deleteTeachersTimetableApi = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}/delete-teacher-timetable`, {
        data: { _id: id },
      });
      resolve(result.data);
    } catch (error) {
      reject(error?.response?.data || error.message);
    }
  });
};