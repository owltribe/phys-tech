/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceRead } from './ServiceRead';
import type { ServiceRequestStatus } from './ServiceRequestStatus';
import type { UserRead } from './UserRead';
export type ServiceRequestRead = {
    id: string;
    status: ServiceRequestStatus;
    service: ServiceRead;
    requested_by: UserRead;
    created_at: string;
};

