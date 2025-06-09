import API from "../../../API/API";
const api = new API();
const endPoint = "sectionlist/delete-section";  // Adjust this to your actual backend route

export const deleteSectionApi = async (sectionId) => {
  console.log("Section ID in deleteSectionApi:", sectionId);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, { _id: sectionId }); // Sending sectionId in body
      console.log("Delete Section API response:", result);
      resolve(result);
    } catch (error) {
      console.error("Delete Section API error:", error);
      reject(error);
    }
  });
};
