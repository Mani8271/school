

import API from "../../../API/API";
const api = new API();
const endPoint = "noticeboard/add-noticeboard";

export const addNoticeBoardApi = async (formData) => {
   
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData
      );
      console.log("NoticeBoard API response: ", result);
      resolve(result);
    } catch (error) {
      console.error("Error in addNoticeBoardApi:", error);
      reject(error);
    }
  });
};
