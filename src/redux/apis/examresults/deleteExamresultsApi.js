import API from "../../../API/API";
const api = new API();
const endPoint = "ExamResult/delete-exam-result";

export const deleteExamresultsApi = async (staffid) => {
    console.log("formdataapi", staffid);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, staffid );
      console.log("/deleteExamresultsApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
