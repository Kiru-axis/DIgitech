import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const publicRoute = this.reflector.getAllAndOverride('publicRoute', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (publicRoute) return true;

    // const { user } = context.switchToHttp().getRequest();

    // if (!user) return false;
    // console.log(!user);

    return super.canActivate(context);
  }
}
