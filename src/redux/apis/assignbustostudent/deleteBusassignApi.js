import API from "../../../API/API";
const api = new API();
const endPoint = "BusAssign/delete-assigned-bus";

export const deleteBusassignApi = async (staffid) => {
    console.log("formdataapi", staffid);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, staffid );
      console.log("/deleteBusassignApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
