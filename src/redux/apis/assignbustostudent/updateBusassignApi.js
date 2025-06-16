import API from "../../../API/API";
const api = new API();
const endPoint = "BusAssign/update-assign-bus";

export const updateBusassignApi = async (updateformdata) => {
    console.log("formdataapi", updateformdata);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}`, updateformdata );
      console.log("updateBusassignApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
