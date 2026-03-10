import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../main/features/login/store/loginSlice";
import registrationReducer from "../main/features/registration/store/registrationSlice";
import newsFeedReducer from "../main/features/newsFeed/store/newsFeedSlice";
import messengerReducer from "../main/features/messenger/store/messengerSlice";
import mailBoxReducer from "../main/features/mailBox/store/mailBoxSlice";
import calendarReducer from "../main/features/classSchedule/store/calendarSlice";
import schoolPolicyReducer from "../main/features/schoolPolicy/store/schoolPolicySlice";
import studentIdCardReducer from "../main/features/studentIdCard/store/studentIdCardSlice";
import attendanceReducer from "../main/features/attendance/store/attendanceSlice";
import leavesReducer from "../main/features/leave/store/slice";
import rewardsReducer from "../main/features/rewards/store/rewardsSlice";
import warningsReducer from "../main/features/warnings/store/warningsSlice";
import complaintsReducer from "../main/features/complaints/store/complaintsSlice";
import tasksReducer from "../main/features/tasks/store/tasksSlice";
import projectsReducer from "../main/features/projects/store/projectsSlice";
import groupsReducer from "../main/features/groups/store/groupsSlice";
import workBoardReducer from "../main/features/workBoard/store/workBoardSlice";
import pagesReducer from "../main/features/pages/store/pagesSlice";
import formsReducer from "../main/features/forms/store/formsSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: registrationReducer,
    newsFeed: newsFeedReducer,
    messenger: messengerReducer,
    mailBox: mailBoxReducer,
    calendar: calendarReducer,
    schoolPolicy: schoolPolicyReducer,
    studentIdCard: studentIdCardReducer,
    attendance: attendanceReducer,
    leaves: leavesReducer,
    rewards: rewardsReducer,
    warnings: warningsReducer,
    complaints: complaintsReducer,
    tasks: tasksReducer,
    projects: projectsReducer,
    groups: groupsReducer,
    workBoard: workBoardReducer,
    pages: pagesReducer,
    forms: formsReducer,
  },
});
