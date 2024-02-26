import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import { UserReadWithOrganization } from "types/generated";

import EventCreation from "./EventCreation";
import ServiceCreation from "./ServiceCreation";
import ServiceRequestCreation from "./ServiceRequestCreation";
import UserProfileEdit from "./UserProfileEdit";

registerSheet("EventCreation", EventCreation);
registerSheet("ServiceRequestCreation", ServiceRequestCreation);
registerSheet("ServiceCreation", ServiceCreation);
registerSheet("UserProfileEdit", UserProfileEdit);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    EventCreation: SheetDefinition;
    ServiceRequestCreation: SheetDefinition<{
      payload: {
        serviceId: string;
      };
    }>;
    ServiceCreation: SheetDefinition;
    UserProfileEdit: SheetDefinition<{
      payload: { user: UserReadWithOrganization };
    }>;
  }
}

export {};
