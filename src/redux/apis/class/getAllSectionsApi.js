import API from "../../../API/API"; // Adjust path if needed
const api = new API();
const endPoint = "sectionlist/sections-data"; // Replace with your actual endpoint

export const getAllSectionsApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All Sections API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
