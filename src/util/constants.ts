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
  STUDENT: {
    BASE: "/student",
    CREATE: "",
  },
  COURSE: {
    BASE: "/course",
    CREATE: "",
    GET_ALL: "",
    GET_ONE: "/:id",
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
};
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
  liveTimeAt: "1d",
};
export const jwtATConstants = {
  stategy: "jwt-access-strategy",
  liveTimeAt: "1h",
};
