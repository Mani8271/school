import API from "../../../API/API";
const api = new API();
const endPoint = "blogs//delete-blog-data"; // 🔧 Adjust this to match your backend route

export const deleteBlogApi = async (blogId) => {
  console.log("Blog ID in deleteBlogApi:", blogId);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, { _id: blogId });
      console.log("Delete Blog API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
