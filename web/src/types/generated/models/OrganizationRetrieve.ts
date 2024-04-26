/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationCategory } from './OrganizationCategory';
import type { ServiceItem } from './ServiceItem';
export type OrganizationRetrieve = {
    id: string;
    name: string;
    bin: (string | null);
    address: (string | null);
    contact: (string | null);
    email: string;
    description: string;
    category: OrganizationCategory;
    services: Array<ServiceItem>;
    photo: (string | null);
    created_at: string;
};

