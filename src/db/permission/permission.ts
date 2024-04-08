import { PERMISSIONS } from "../../util/constants";
import { END_POINTS } from "../../util/constants";
export const permissionDATA = [
  // Phòng đào tạo
  {
    endpoint: `${END_POINTS.STUDENT.BASE}/${END_POINTS.STUDENT.CREATE}`,
    action: PERMISSIONS.POST,
  },
  {
    endpoint: `${END_POINTS.SUBJECT.BASE}/${END_POINTS.SUBJECT.CREATE}`,
    action: PERMISSIONS.POST,
  },
];
