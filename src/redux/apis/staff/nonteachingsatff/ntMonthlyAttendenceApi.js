import API from "../../../../API/API";
const api = new API();

const endPoint = "staffMonthlyattendancedata/staff-monthly-attendance";

export const getNonTeachingMonthlyAttendanceApi = async (params) => {
    console.log("getNonTeachingMonthlyAttendanceApi - params:", params);
  return new Promise(async (resolve, reject) => {
    try {
       const result = await api.get(endPoint, params);

      console.log("📊 Non-Teaching Monthly Attendance API response:", result);
      resolve(result);
    } catch (error) {
      console.error("❌ Non-Teaching Monthly Attendance API error:", error);
      reject(error);
    }
  });
};