import API from "../../../API/API";
const api = new API();
const endPoint = "BusAssign/assign-bus";

export const addBusassignApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData );
      console.log("addBusassignApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
