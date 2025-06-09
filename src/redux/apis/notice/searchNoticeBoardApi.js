import API from "../../../API/API";
const api = new API();
const endPoint = "noticeboard/search-noticeboard-data";

export const searchNoticeboardApi = async (queryParams) => {
  console.log("searchNoticeboardApi", queryParams);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(endPoint, { params: queryParams }); // <- here!
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
