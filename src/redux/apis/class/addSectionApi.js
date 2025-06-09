import API from "../../../API/API";
const api = new API();
const endPoint = "sectionlist/add-section"; // Adjust this if your actual endpoint differs

export const addSectionApi = async (formData) => {
  console.log("formData in addSectionApi:", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData);
      console.log("Add Section API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
