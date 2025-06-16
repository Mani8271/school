import API from "../../../API/API";

const api = new API();

const endPoint = "students/bulk-upload"; // Make sure this matches your backend route

export const uploadStudentsCsvApi = async (formData) => {
  console.log("uploadStudentsCsvApi - formData:", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // if cookies/token are used
      });
      console.log("Students CSV Upload Response:", result);
      resolve(result);
    } catch (error) {
      console.error("Students CSV Upload Error:", error);
      reject(error);
    }
  });
};