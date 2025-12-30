import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../prisma/types_workaround';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    name?: string;

    // Optional: Allow specifying role for demo purposes, 
    // or default to USER if not exists.
    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
