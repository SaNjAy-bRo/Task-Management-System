import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from '../prisma/types_workaround';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Missing Authorization Header');
        }

        // Mock Token Validation
        // Expected format: "Bearer mock-token-USERID-ROLE"
        const token = authHeader.split(' ')[1];
        if (!token || !token.startsWith('mock-token-')) {
            throw new UnauthorizedException('Invalid Token');
        }

        // Extract Basic Info from "token"
        const parts = token.split('-');
        if (parts.length < 4) {
            throw new UnauthorizedException('Malformed Token');
        }

        // Structure: mock-token-{uuid}-{role}
        // But UUID has dashes, so valid: mock-token-123e4567-e89b-12d3-a456-426614174000-ADMIN
        // Helper: join parts for ID
        const role = parts[parts.length - 1] as Role;
        // Assuming ID is standard UUID (36 chars) or similar, but simplified here:
        // Let's rely on the mock login returning `mock-token-${user.id}-${user.role}`
        // We will extract everything between 'mock-token-' and '-role' as ID.

        // Simpler approach for demo: Just passing ID in header usually, 
        // but let's stick to the token format.
        const idAndRole = token.replace('mock-token-', '');
        const lastDash = idAndRole.lastIndexOf('-');
        const userId = idAndRole.substring(0, lastDash);

        // Attach to request
        request.user = { id: userId, role: role };
        return true;
    }
}
