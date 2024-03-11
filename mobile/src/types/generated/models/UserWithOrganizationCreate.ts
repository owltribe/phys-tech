/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationCreate } from './OrganizationCreate';
import type { UserRole } from './UserRole';
export type UserWithOrganizationCreate = {
    email: string;
    password: string;
    is_active?: (boolean | null);
    is_superuser?: (boolean | null);
    is_verified?: (boolean | null);
    contact: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    organization_data?: (OrganizationCreate | null);
};

