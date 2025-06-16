import API from "../../../API/API";
const api = new API();
const endPoint = "ExamResult/exams-results-data"; // Endpoint to fetch all classes

export const getAllexamresultsApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All non getAllexamresultsApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};