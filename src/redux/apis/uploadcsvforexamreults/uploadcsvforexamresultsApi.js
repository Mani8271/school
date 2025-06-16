import API from "../../../API/API";

const api = new API();

const endPoint = "ExamResult/bulk-upload"; // Make sure this matches your backend route

export const uploadExamresultsCsvApi = async (formData) => {
  console.log("uploadExamresultsCsvApi - formData:", formData);

  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // if cookies/token are used
      });

      console.log("Exam Results CSV Upload Response:", result);
      resolve(result);
    } catch (error) {
      console.error("Eax, results CSV Upload Error:", error);
      reject(error);
    }
  });
};