import API from "../../../API/API";
const api = new API();
const endPoint = "blogs/blogs"; // Your backend endpoint for fetching all blogs

export const getAllBlogsApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All Blogs API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
