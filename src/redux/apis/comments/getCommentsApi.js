import API from "../../../API/API"; // Adjust the path as needed
const api = new API();
const endPoint = "comments"; // Endpoint base path for comments

/**
 * Get all comments for a specific blog

 */
export const getAllCommentsApi = async (blogId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}/${blogId}`);
      console.log("Get All Comments API response:", result);
      resolve(result);
    } catch (error) {
      console.error("❌ Error fetching comments:", error);
      reject(error);
    }
  });
};
