import { combineReducers } from "redux";
import registerReducer from "./loginandsignup/registerReducer";
import forgotPasswordReducer from "./loginandsignup/forgotPasswordReducer";
import LoginwithemailReducer from "./loginandsignup/LoginwithemailReducer";
import AddstudentReducer from "./students/addstudentReducer";
import GetuserprofileReducer from "./userprofile/getuserprofileReducer";
import UpdateuserprofileReducer from "./userprofile/updateuserprofileReducer";
import AddClassReducer from "./class/addClassReducer";
import GetAllClassesReducer from "./class/getAllClassesReducer";
import GetAllStudentsReducer from "./students/getstudentsReducer";
import UpdatestudentReducer from "./students/updatestudentReducer";
import DeletestudentReducer from "./students/deletestudentReducer";
import AddClassTimetableReducer from "./class/addClassTimetableReducer";
import GetClassTimetableReducer from "./class/getClassTimetableReducer";
import AddteachingstaffReducer from "./staff/teachingstaff/addteachingstaffReducer";
import GetAllTeachersReducer from "./staff/teachingstaff/getteachingstaffReducer";
import UpdateteacherReducer from "./staff/teachingstaff/updateteachingstaffReducer";
import DeleteteacherReducer from "./staff/teachingstaff/deleteteachingstaffReducer";

import AddnonteachingstaffReducer from "./staff/nonteachingstaff/addnonteachingstaffReducer";
import GetAllnonTeachersReducer from "./staff/nonteachingstaff/getnonteachingstaffReducer";
import UpdatenonteacherReducer from "./staff/nonteachingstaff/updatenonteachingstaffReducer";
import DeletenonteacherReducer from "./staff/nonteachingstaff/nonteachingstaffdeleteReducer";
import AddbuslistReducer from "./schoolbus/buslist/addbuslistReducer";
import DeletebuslistReducer from "./schoolbus/buslist/deletebuslistReducer";
import GetAllBuslistReducer from "./schoolbus/buslist/getallbuslistReducer";
import UpdatebuslistReducer from "./schoolbus/buslist/updatebuslistReducer";
import AddbusrouteReducer from "./schoolbus/busroute/addbusrouteReducer";
import DeletebusrouteReducer from "./schoolbus/busroute/deletebusrouteReducer";
import GetAllBusrouteReducer from "./schoolbus/busroute/getallbusrouteReducer";
import UpdatebusrouteReducer from "./schoolbus/busroute/updatebusrouteReducer";
import AddbusstaffReducer from "./schoolbus/busstaff/addbusstaffReducer";
import DeletebusstaffReducer from "./schoolbus/busstaff/deletebusstaffReducer";
import GetAllBusstaffReducer from "./schoolbus/busstaff/getallbusstaffReducer";
import UpdatebusstaffReducer from "./schoolbus/busstaff/updatebusstaffReducer";
import AddFessReducer from "./fees/addFeesReducer";
import UpdatefeesReducer from "./fees/updateFeesReducer";
import GetAllFeesReducer from "./fees/getAllfeesdataReducer";
import DeleteFeesReducer from "./fees/deleteFeesReducer";
import AddPayrollReducer from "./payroll/addPayrollReducer";
import UpdatepayrollReducer from "./payroll/updatePayrollReducer";
import DeletePayrollReducer from "./payroll/deletePayrollReducer";
import GetAllPayrollReducer from "./payroll/getAllpayrollReducer";

import AddHolidayReducer from "./holiday/addHolidayReducer";
import AddNoticeboardReducer from "./notice/addNoticeBoardReducer";
import GetAllNoticeboardReducer from "./notice/getNoticeBoardReducer";
import AddSectionReducer from "./class/addSectionReducer";
import GetAllSectionsReducer from "./class/getAllSectionsReducer";
import GetAllHolidayReducer from "./holiday/getHolidayReducer";
import searchNoticeboardReducer from "./notice/searchNoticeBoardReducer";
import { Add } from "@mui/icons-material";
import AddBlogReducer from "./blog/addBlogReducer";
import GetAllBlogsReducer from "./blog/getAllBlogsReducer";
import AddCommentReducer from "./comments/addCommentReducer";
import GetAllCommentsReducer from "./comments/getCommentsReducer";
import GetAllNotificationsReducer from "./notifications/getAllNotificationsReducer";
import teachersTimetableReducer from "./staff/teachingstaff/teachersTimetableReducer";
import staffLeaveRequestsReducer from "./staff/teachingstaff/staffLeaveRequestsReducer";
import staffDailyAttendanceReducer from "./staff/teachingstaff/staffDailyAttendenceReducer";
import UploadTeachingStaffCsvReducer from "./staff/teachingstaff/uploadTeachingStaffCsvReducer";
import UploadNonTeachingStaffCsvReducer from "./staff/nonteachingstaff/uploadNonTeachingStaffCsvReducer";
import { getNonTeachingMonthlyAttendanceApi } from "../apis/staff/nonteachingsatff/ntMonthlyAttendenceApi";
import NonTeachingMonthlyAttendanceReducer from "./staff/nonteachingstaff/ntMonthlyAttendenceReducer";
import AddExamresultsReducer from "./examresults/addExamresultsReducer";
import DeleteExamresultsReducer from "./examresults/deleteExamresultsReducer";
import UpdateexamresultsReducer from "./examresults/updateExamresultsReducer";
import GetAllExamresultsReducer from "./examresults/getAllexamresultsReducer";
import UploadExamresultsCsvReducer from "./uploadcsvforexamresults/uploadcsvforexamresultsReducer";
import AddBusassignReducer from "./busassigntostudent/addBusassignReducer";
import DeleteBusassignReducer from "./busassigntostudent/deleteBusassignReducer";
import UpdatebusassignReducer from "./busassigntostudent/updateBusassignReducer";
import GetAllBusassignReducer from "./busassigntostudent/getAllbusassignReducer";
import StudentMonthlyAttendanceReducer from "./students/getmonthlyattendenceReducer";
import UploadStudentsCsvReducer from "./students/uploadstudentcsvReducer";







const rootReducer = combineReducers({
  // login and signup flow ...
  emaillogindata: LoginwithemailReducer,
  registerdata: registerReducer,
  forgotPasswordData: forgotPasswordReducer,
  //  students
  addstudent: AddstudentReducer,
  getallstudents: GetAllStudentsReducer,
  updatestudent: UpdatestudentReducer,
  deletestudent: DeletestudentReducer,
  // teaching staff
  addteacher: AddteachingstaffReducer,
  getallteachers: GetAllTeachersReducer,
  updateteacher: UpdateteacherReducer,
  deleteteacher: DeleteteacherReducer,
  // non teaching staff
  addnonteacher: AddnonteachingstaffReducer,
  getallnonteachers: GetAllnonTeachersReducer,
  updatenonteacher: UpdatenonteacherReducer,
  deletenonteacher: DeletenonteacherReducer,
  // bus list
  addbuslist: AddbuslistReducer,
  updatebuslist: UpdatebuslistReducer,
  getallbuslist: GetAllBuslistReducer,
  deletebuslist: DeletebuslistReducer,
  // bus route
  addbusroute: AddbusrouteReducer,
  updatebusroute: UpdatebusrouteReducer,
  getallbusroute: GetAllBusrouteReducer,
  deletebusroute: DeletebusrouteReducer,
  // bus staff
  addbusstaff: AddbusstaffReducer,
  updatebusstaff: DeletebusstaffReducer,
  getallbusstaff: GetAllBusstaffReducer,
  deletebusstaff: UpdatebusstaffReducer,
  // payroll
  addpayroll: AddPayrollReducer,
  updatepayroll: UpdatepayrollReducer,
  deletepayroll: DeletePayrollReducer,
  getallpayroll: GetAllPayrollReducer,
  // fees
  addfees: AddFessReducer,
  getallfees: GetAllFeesReducer,
  updatefees: UpdatefeesReducer,
  deletefees: DeleteFeesReducer,
  // user profile
  userdetails: GetuserprofileReducer,
  updateduserdetails: UpdateuserprofileReducer,
  //class
  addclass: AddClassReducer,
  getclasses: GetAllClassesReducer,
  addtimetable: AddClassTimetableReducer,
  getclasstimetable: GetClassTimetableReducer,
  addsection:AddSectionReducer,
  getsections: GetAllSectionsReducer,

  //holiday
  addholiday: AddHolidayReducer,
 getholidays: GetAllHolidayReducer,

  //notice
  addnotice: AddNoticeboardReducer,
  getnotices: GetAllNoticeboardReducer,
  searchNoticeboard: searchNoticeboardReducer,

  //blog
  addblog: AddBlogReducer,
  blogs: GetAllBlogsReducer,

  //comment
  commentdetails: AddCommentReducer,
  comments: GetAllCommentsReducer,

  //notifications
   notificationsData: GetAllNotificationsReducer,

   //teacher timetable
    teachersTimetableData: teachersTimetableReducer,
 // staff leave requests
 leaveRequestsData: staffLeaveRequestsReducer,
// staff daily attendance
   staffDailyAttendance: staffDailyAttendanceReducer,
   // upload teaching staff csv
     teachingStaffUpload: UploadTeachingStaffCsvReducer,
     // non-teaching staff upload
     nonteachingStaffUpload: UploadNonTeachingStaffCsvReducer,
 // non-teaching monthly attendance
     getnonteachingmonthlyattendence: NonTeachingMonthlyAttendanceReducer,
     // add exam results
  addexamresults: AddExamresultsReducer,
  deleteexamresults: DeleteExamresultsReducer,
  updateexamresults: UpdateexamresultsReducer,
  getallexamresults: GetAllExamresultsReducer,
   csvexamresults: UploadExamresultsCsvReducer,
    addbusassign: AddBusassignReducer,
  deletebusassign: DeleteBusassignReducer,
  updatebusassign: UpdatebusassignReducer,
  getallbusassign: GetAllBusassignReducer,
  studentmontlyattendence: StudentMonthlyAttendanceReducer,
  uploadstudent: UploadStudentsCsvReducer,

});
export default rootReducer;