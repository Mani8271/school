import API from "../../../API/API";
const api = new API();
const endPoint = "blogs/update-blog-data"; // Use your actual blog endpoint

export const updateBlogApi = async (formData) => {
  console.log("📦 Blog Update FormData:", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}`, formData);
      console.log("✅ Blog Update API Response:", result);
      resolve(result);
    } catch (error) {
      console.error("❌ Blog Update API Error:", error);
      reject(error);
    }
  });
};
