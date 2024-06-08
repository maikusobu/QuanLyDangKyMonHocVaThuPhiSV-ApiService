import { InsertPermission } from "@db/schema";
import { PERMISSIONS } from "../../util/constants";
import { END_POINTS } from "../../util/constants";

export const permissionData: InsertPermission[] = [
  // course
  {
    endpoint: `${END_POINTS.COURSE.BASE}/${END_POINTS.COURSE.CREATE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.COURSE.BASE}/${END_POINTS.COURSE.DELETE}`,
    action: PERMISSIONS.DELETE,
  },
  {
    endpoint: `${END_POINTS.COURSE.BASE}/${END_POINTS.COURSE.UPDATE}`,
    action: PERMISSIONS.PATCH,
  },
  {
    endpoint: `${END_POINTS.COURSE.BASE}/${END_POINTS.COURSE.GET_ONE}`,
    action: PERMISSIONS.GET,
  },
  {
    endpoint: `${END_POINTS.COURSE.BASE}/${END_POINTS.COURSE.GET_ALL}`,
    action: PERMISSIONS.GET,
  },
  // course open
  {
    endpoint: `${END_POINTS.COURSE_OPEN.BASE}/${END_POINTS.COURSE_OPEN.CREATE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.COURSE_OPEN.BASE}/${END_POINTS.COURSE_OPEN.DELETE}`,
    action: PERMISSIONS.DELETE,
  },
  {
    endpoint: `${END_POINTS.COURSE_OPEN.BASE}/${END_POINTS.COURSE_OPEN.CURRENT_STATE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.COURSE_OPEN.BASE}/${END_POINTS.COURSE_OPEN.GET_ALL_ONE_TERM}`,
    action: PERMISSIONS.GET,
  },
  // course registration
  {
    endpoint: `${END_POINTS.COURSE_REGISTRATION.BASE}/${END_POINTS.COURSE_REGISTRATION.CREATE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.COURSE_REGISTRATION.BASE}/${END_POINTS.COURSE_REGISTRATION.DELETE}`,
    action: PERMISSIONS.DELETE,
  },
  {
    endpoint: `${END_POINTS.COURSE_REGISTRATION.BASE}/${END_POINTS.COURSE_REGISTRATION.UPDATE}`,
    action: PERMISSIONS.PATCH,
  },
  {
    endpoint: `${END_POINTS.COURSE_REGISTRATION.BASE}/${END_POINTS.COURSE_REGISTRATION.GET_ONE}`,
    action: PERMISSIONS.GET,
  },
  {
    endpoint: `${END_POINTS.COURSE_REGISTRATION.BASE}/${END_POINTS.COURSE_REGISTRATION.GET_ALL}`,
    action: PERMISSIONS.GET,
  },
  // course type
  {
    endpoint: `${END_POINTS.COURSE_TYPE.BASE}/${END_POINTS.COURSE_TYPE.GET_ALL}`,
    action: PERMISSIONS.GET,
  },
  // faculty
  {
    endpoint: `${END_POINTS.FACULTY.BASE}/${END_POINTS.FACULTY.GET_ALL}`,
    action: PERMISSIONS.GET,
  },
  // major
  {
    endpoint: `${END_POINTS.MAJOR.BASE}/${END_POINTS.MAJOR.GET_PROGRAM}`,
    action: PERMISSIONS.GET,
  },
  {
    endpoint: `${END_POINTS.MAJOR.BASE}/${END_POINTS.MAJOR.GET_ALL}`,
    action: PERMISSIONS.GET,
  },
  // payment
  {
    endpoint: `${END_POINTS.PAYMENT.BASE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.PAYMENT.BASE}/${END_POINTS.PAYMENT.DELETE}`,
    action: PERMISSIONS.DELETE,
  },
  {
    endpoint: `${END_POINTS.PAYMENT.BASE}/${END_POINTS.PAYMENT.UPDATE}`,
    action: PERMISSIONS.PATCH,
  },
  {
    endpoint: `${END_POINTS.PAYMENT.BASE}/${END_POINTS.PAYMENT.GET_PAYMENT}`,
    action: PERMISSIONS.GET,
  },
  {
    endpoint: `${END_POINTS.PAYMENT.BASE}/${END_POINTS.PAYMENT.GET_TUITION}`,
    action: PERMISSIONS.GET,
  },
  // priority
  {
    endpoint: `${END_POINTS.PRIORITY.BASE}/${END_POINTS.PRIORITY.GET_ALL}`,
    action: PERMISSIONS.GET,
  },
  // program item
  {
    endpoint: `${END_POINTS.PROGRAM_ITEM.BASE}/${END_POINTS.PROGRAM_ITEM.CREATE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.PROGRAM_ITEM.BASE}/${END_POINTS.PROGRAM_ITEM.DELETE}`,
    action: PERMISSIONS.DELETE,
  },
  {
    endpoint: `${END_POINTS.PROGRAM_ITEM.BASE}/${END_POINTS.PROGRAM_ITEM.UPDATE}`,
    action: PERMISSIONS.PATCH,
  },
  // province
  {
    endpoint: `${END_POINTS.PROVINCE.BASE}/${END_POINTS.PROVINCE.GET_ALL}`,
    action: PERMISSIONS.GET,
  },
  {
    endpoint: `${END_POINTS.PROVINCE.BASE}/${END_POINTS.PROVINCE.GET_ALL_DISTRICT}`,
    action: PERMISSIONS.GET,
  },
  // course registration
  {
    endpoint: `${END_POINTS.COURSE_REGISTRATION.BASE}/${END_POINTS.COURSE_REGISTRATION.CREATE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.COURSE_REGISTRATION.BASE}/${END_POINTS.COURSE_REGISTRATION.GET_ALL}`,
    action: PERMISSIONS.GET,
  },

  // student
  {
    endpoint: `${END_POINTS.STUDENT.BASE}/${END_POINTS.STUDENT.CREATE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.STUDENT.BASE}/${END_POINTS.STUDENT.DELETE}`,
    action: PERMISSIONS.DELETE,
  },
  {
    endpoint: `${END_POINTS.STUDENT.BASE}/${END_POINTS.STUDENT.UPDATE}`,
    action: PERMISSIONS.PATCH,
  },
  {
    endpoint: `${END_POINTS.STUDENT.BASE}/${END_POINTS.STUDENT.GET_ONE}`,
    action: PERMISSIONS.GET,
  },
  {
    endpoint: `${END_POINTS.STUDENT.BASE}/${END_POINTS.STUDENT.GET_ALL}`,
    action: PERMISSIONS.GET,
  },
];
