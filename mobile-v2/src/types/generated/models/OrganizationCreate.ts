/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from './Category';
export type OrganizationCreate = {
    name: string;
    bin: (string | null);
    address: (string | null);
    contact: (string | null);
    email: string;
    description: string;
    category: (Category | null);
};

