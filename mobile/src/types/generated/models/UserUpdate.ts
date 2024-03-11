/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRole } from './UserRole';
export type UserUpdate = {
    password?: (string | null);
    email?: (string | null);
    is_active?: (boolean | null);
    is_superuser?: (boolean | null);
    is_verified?: (boolean | null);
    contact: string;
    first_name?: (string | null);
    last_name?: (string | null);
    role?: (UserRole | null);
    organization_id?: (string | null);
};

