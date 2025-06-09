import API from "../../../API/API";
const api = new API();
const endPoint = "holidays//delete-holiday-data"; // Update with your backend route

export const deleteHolidayApi = async (holidayId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(endPoint, { _id: holidayId }); // Send ID in body
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
