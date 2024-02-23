/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceRequestStatus } from './ServiceRequestStatus';
import type { ServiceRetrieve } from './ServiceRetrieve';
import type { UserRead } from './UserRead';
export type ServiceRequestRetrieve = {
    id: string;
    status: ServiceRequestStatus;
    comment: (string | null);
    service: ServiceRetrieve;
    requested_by: UserRead;
    created_at: string;
};

