import API from "../../../API/API";
const api = new API();
const endPoint = "ExamResult/update-exam-result";

export const updateExamresultsApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}`, formData );
      console.log("updateExamresultsApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
