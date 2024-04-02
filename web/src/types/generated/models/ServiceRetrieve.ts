/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationRead } from './OrganizationRead';
import type { ServiceImageRead } from './ServiceImageRead';
export type ServiceRetrieve = {
    id: string;
    name: string;
    description: (string | null);
    expected_result: (string | null);
    cost: number;
    service_images?: Array<ServiceImageRead>;
    organization: OrganizationRead;
    is_editable?: boolean;
};

