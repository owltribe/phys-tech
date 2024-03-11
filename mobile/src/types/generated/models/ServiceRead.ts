/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationRead } from './OrganizationRead';
import type { ServiceImageRead } from './ServiceImageRead';
export type ServiceRead = {
    id: string;
    name: string;
    description: (string | null);
    expected_result: (string | null);
    cost: number;
    service_images?: Array<ServiceImageRead>;
    organization: OrganizationRead;
    is_editable?: boolean;
};

