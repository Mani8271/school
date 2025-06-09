import API from "../../../API/API";
const api = new API();
const endPoint = "holidays/holidays-data"; // Adjust based on your actual API endpoint

export const getHolidaysApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get Holidays API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
