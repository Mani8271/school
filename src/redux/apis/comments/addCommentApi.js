import API from "../../../API/API";
const api = new API();
const endPoint = "comments/add-comment";

export const addCommentApi = async (formData) => {
  console.log("formData in addCommentApi:", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Add Comment API response:", result);
      resolve(result);
    } catch (error) {
      console.error("Error in addCommentApi:", error);
      reject(error);
    }
  });
};
