import API from "../../../API/API";
const api = new API();
const endPoint = "holidays/update-holiday-data";

export const updateHolidayApi = async (holidayData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(endPoint, holidayData);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
