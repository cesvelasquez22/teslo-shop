import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: Roles[]) {
  return applyDecorators(
    // SetMetadata('roles', roles), // Also can be used as a shorthand by RoleProtectedDecorators
    RoleProtected(...roles),
    UseGuards(AuthGuard(), RolesGuard),
    // ApiBearerAuth(), // Extra guards
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }), // Extra guards
  );
}
