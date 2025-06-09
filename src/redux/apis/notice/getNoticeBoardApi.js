import API from "../../../API/API";
const api = new API();
const endPoint = "noticeboard/noticeboards"; // Endpoint to fetch all noticeboards

export const getNoticeboardsApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get Noticeboards API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
