/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationCategory } from './OrganizationCategory';
export type OrganizationRead = {
    id: string;
    name: string;
    bin: (string | null);
    address: (string | null);
    contact: (string | null);
    email: string;
    description: string;
    category: (OrganizationCategory | null);
    photo: (string | null);
};

