import { InsertPermission } from "@db/schema";
import { PERMISSIONS } from "../../util/constants";
import { END_POINTS } from "../../util/constants";

export const permissionData: InsertPermission[] = [
  {
    endpoint: `${END_POINTS.STUDENT.BASE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.COURSE.BASE}/${END_POINTS.COURSE.CREATE}`,
    action: PERMISSIONS.POST,
  },
];
