import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async login(loginDto: LoginDto) {
        const { email, name, role } = loginDto;

        // Find or create user for the "Mock Auth" flow
        let user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email,
                    name: name || 'New User',
                    role: role || 'USER',
                },
            });
        }

        // Return user info and a mock token
        // In a real app, we'd sign a JWT here.
        return {
            accessToken: `mock-token-${user.id}-${user.role}`,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
}
