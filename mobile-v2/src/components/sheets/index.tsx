import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

import EventCreation from "./EventCreation";

registerSheet("event-creation", EventCreation);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "event-creation": SheetDefinition;
  }
}

export {};
