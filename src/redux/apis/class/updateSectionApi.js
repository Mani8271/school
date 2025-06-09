import API from "../../../API/API";
const api = new API();
const endPoint = "sectionlist/update-section"; // Your section update endpoint

export const updateSectionApi = async (sectionId, sectionData) => {
  console.log("Data in updateSectionApi:", sectionId, sectionData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}`, { _id: sectionId, ...sectionData }); // Include _id in body
      console.log("Update Section API response:", result);
      resolve(result);
    } catch (error) {
      console.error("Update Section API error:", error);
      reject(error);
    }
  });
};
