/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRole } from './UserRole';
export type UserRead = {
    id: any;
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_verified?: boolean;
    avatar?: (string | null);
    contact?: (string | null);
    first_name: string;
    last_name: string;
    role: UserRole;
    full_name: string;
};
