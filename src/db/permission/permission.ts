import { PERMISSIONS } from "../../util/constants";
import { END_POINTS } from "../../util/constants";
export const permissionDATA = [
  {
    endpoint: `${END_POINTS.STUDENT.BASE}/${END_POINTS.STUDENT.CREATE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.COURSE.BASE}/${END_POINTS.COURSE.CREATE}`,
    action: PERMISSIONS.POST,
  },
];
