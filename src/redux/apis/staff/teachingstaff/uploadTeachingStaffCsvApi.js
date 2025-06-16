import API from "../../../../API/API";
const api = new API();

const endPoint = "teachingstaff/bulk-upload"; // Make sure this matches your backend route

export const uploadTeachingStaffCsvApi = async (formData) => {
  console.log("uploadTeachingStaffCsvApi - formData:", formData);

  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // if cookies/token are used
      });

      console.log("Teaching Staff CSV Upload Response:", result);
      resolve(result);
    } catch (error) {
      console.error("Teaching Staff CSV Upload Error:", error);
      reject(error);
    }
  });
};
