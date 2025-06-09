import API from "../../../API/API";
const api = new API();
const endPoint = "systemUsers/reset-password"; // adjust based on your route

export const updatePasswordApi = async (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData);
      console.log("Update Password API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
