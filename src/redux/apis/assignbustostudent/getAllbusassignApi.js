import API from "../../../API/API";
const api = new API();
const endPoint = "BusAssign/assigned-buses-data"; // Endpoint to fetch all classes

export const getAllbusassignApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All non getAllbusassignApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};