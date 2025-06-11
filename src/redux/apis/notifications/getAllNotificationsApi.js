import API from "../../../API/API"; // Adjust path as needed

const api = new API();
const endPoint = "notifications/all-notifications"; // Example endpoint - adjust based on your backend route

export const getAllNotificationsApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All Notifications API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};