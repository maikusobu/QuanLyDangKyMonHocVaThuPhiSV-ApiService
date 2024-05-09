export const END_POINTS = {
  BASE: "api/v1",
  TASK_SCHEDULE: {
    BASE: "/task-schedule",
  },
  USER: {
    BASE: "/user",
  },
  AUTH: {
    BASE: "/auth",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REFRESH: "/refresh",
  },
  PROVINCE: {
    BASE: "/province",
    GET_ALL_DISTRICT: "/district/:provinceId",
  },
  PRIORITY: {
    BASE: "/priority",
  },
  STUDENT: {
    BASE: "/student",
    GET_ONE: "/:id",
    UPDATE: "/:id",
    DELETE: "/:id",
  },
  COURSE: {
    BASE: "/course",
    CREATE: "",
    GET_ALL: "",
    GET_ONE: "/:id",
    UPDATE: "/:id",
    DELETE: "/:id",
  },
  COURSE_OPEN: {
    BASE: "/course-open",
    CREATE: "",
    GET_ALL: "",
    UPDATE: "/:id",
    DELETE: "/:id",
  },
  FACULTY: {
    BASE: "/faculty",
    GET_ALL: "",
  },
  COURSE_TYPE: {
    BASE: "/course-type",
    GET_ALL: "",
  },
  MAJOR: {
    BASE: "/major",
    GET_PROGRAM: "/:id/program",
  },
  PROGRAM_ITEM: {
    BASE: "/program-item",
    CREATE: "",
    DELETE: "/:id",
    UPDATE: "/:id",
  },
};
export enum TERM {
  FIRST = "first",
  SECOND = "second",
  THIRD = "third",
}
export enum ROLE_NAME {
  ADMIN = "admin",
  EMPLOYEE = "employee",
  STUDENT = "student",
}
export enum PERMISSIONS {
  POST = "post",
  GET = "get",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}
export const jwtRTConstants = {
  stategy: "jwt-refresh-strategy",
  liveTimeAt: "7d",
};
export const jwtATConstants = {
  stategy: "jwt-access-strategy",
  liveTimeAt: "7d",
};
