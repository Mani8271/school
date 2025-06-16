import API from "../../../../API/API";
const api = new API();

const endPoint = "nonteachingstaff/bulk-upload"; // Make sure this matches your backend route

export const uploadNonTeachingStaffCsvApi = async (formData) => {
  console.log("uploadNonTeachingStaffCsvApi - formData:", formData);

  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // if cookies/token are used
      });

      console.log("Non-Teaching Staff CSV Upload Response:", result);
      resolve(result);
    } catch (error) {
      console.error("Non-Teaching Staff CSV Upload Error:", error);
      reject(error);
    }
  });
};
