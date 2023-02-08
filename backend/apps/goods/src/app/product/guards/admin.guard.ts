import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

const Action = {
  'POST': 'create',
  'DELETE': 'delete',
  'PATCH': 'update'
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const isAdmin = user.isAdmin;

    if (!isAdmin) {
      throw new ForbiddenException(`User with role admin only can ${Action[request.method]} product`)
    }

    return true;
  }
}
