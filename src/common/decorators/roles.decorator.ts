import { SetMetadata } from "@nestjs/common";
import { ROLE_NAME } from "@util/constants";

export const ROLES_KEY = "roles";
export const Roles = (...roles: ROLE_NAME[]) => SetMetadata(ROLES_KEY, roles);
// Xác định 1 số role cụ thể cho 1 route
