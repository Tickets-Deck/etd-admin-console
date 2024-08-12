import { AdminUser } from "./IAdminUser";

export type AdminUserAuthSuccessResponse = {
  data: AdminUser;
  status: number;
};
export type AdminUserAuthErrorResponse = {
  error: string;
  status: number;
};
