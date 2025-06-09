import API from "../../../API/API";
const api = new API();
const endPoint = "blogs/add-blog";

export const addBlogApi = async (formData) => {
  console.log("formData in addBlogApi:", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Add Blog API response:", result);
      resolve(result);
    } catch (error) {
      console.error("Error in addBlogApi:", error);
      reject(error);
    }
  });
};
