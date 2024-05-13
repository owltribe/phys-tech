/* generated using openapi-typescript-codegen -- do no edit */
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
    technical_specifications: (string | null);
    sample_preparation: (string | null);
    has_certificate: (boolean | null);
    is_editable?: boolean;
};

