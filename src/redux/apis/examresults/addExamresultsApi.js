import API from "../../../API/API";
const api = new API();
const endPoint = "ExamResult//add-exam-result";

export const addExamresultsApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData );
      console.log("addExamresultsApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
