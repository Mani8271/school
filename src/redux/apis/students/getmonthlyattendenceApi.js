import API from "../../../API/API";

const api = new API();

const endPoint = "StudentAttendance/student-monthly-attendance";

export const getStudentMonthlyAttendanceApi = async (params) => {
    console.log("getStudentMonthlyAttendanceApi - params:", params);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(endPoint, params);
      console.log("📊 Student Monthly Attendance API response:", result);
      resolve(result);
    } catch (error) {
      console.error("❌ Student Monthly Attendance API error:", error);
      reject(error);
    }
  });
};