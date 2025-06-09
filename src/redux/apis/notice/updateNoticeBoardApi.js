import API from "../../../API/API";
const api = new API();
const endPoint = "noticeboard/update-noticeboard-data"; // Endpoint for updating the noticeboard

export const updateNoticeboardApi = async ( noticeboardData) => {
  console.log("Data in updateNoticeboardApi:", noticeboardData);

  return new Promise(async (resolve, reject) => {
    try {
      // Use FormData for image + text fields
      // const formData = new FormData();
      // formData.append("_id", noticeboardId);

      // for (const key in noticeboardData) {
      //   formData.append(key, noticeboardData[key]);
      // }

      const result = await api.patch(endPoint, noticeboardData); // PATCH request with multipart/form-data
      console.log("Update Noticeboard API response:", result);
      resolve(result);
    } catch (error) {
      console.error("Update Noticeboard API error:", error);
      reject(error);
    }
  });
};
