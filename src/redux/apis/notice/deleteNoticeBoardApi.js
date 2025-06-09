import API from "../../../API/API";
const api = new API();
const endPoint = "noticeboard/delete-noticeboard-data"; // Your actual backend delete route

export const deleteNoticeboardApi = async (noticeId) => {
  console.log("Notice ID in deleteNoticeboardApi:", noticeId);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, { _id: noticeId }); // Sending noticeId in body
      console.log("Delete Noticeboard API response:", result);
      resolve(result);
    } catch (error) {
      console.error("Delete Noticeboard API error:", error);
      reject(error);
    }
  });
};
