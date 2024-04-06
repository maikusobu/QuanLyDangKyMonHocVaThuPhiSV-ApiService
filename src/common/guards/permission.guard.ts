import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthRepository } from "@repository/auth/auth.repostiory";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly auth: AuthRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      "isPublic",
      context.getHandler(),
    );
    const { user, route, method } = context.switchToHttp().getRequest();
    if (isPublic) {
      return true;
    }
    const permission = await this.auth.hasPermission(
      user.id,
      route.path,
      method,
    );
    if (!permission)
      throw new ForbiddenException(
        "You do not have permission to access this resource",
      );
    return true;
  }
}
