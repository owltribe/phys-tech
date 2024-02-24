import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

import EventCreation from "./EventCreation";
import ServiceCreation from "./ServiceCreation";
import ServiceRequestCreation from "./ServiceRequestCreation";

registerSheet("EventCreation", EventCreation);
registerSheet("ServiceRequestCreation", ServiceRequestCreation);
registerSheet("ServiceCreation", ServiceCreation);

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
  }
}

export {};
