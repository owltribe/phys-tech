import "./src/components/sheets";

import { LogBox, StatusBar } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import { PaperProvider } from "react-native-paper";
import { registerTranslation, ru } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "providers/AuthProvider";
import { ReactQueryClientProvider } from "providers/ReactQueryProvider";

import theme from "./src/styles/theme";
import Router from "./Router";
registerTranslation("ru", ru);

export default function App() {
  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <SafeAreaProvider
          style={{ flex: 1, marginTop: StatusBar.currentHeight }}
        >
          <SheetProvider>
            <PaperProvider theme={theme}>
              <Router />
            </PaperProvider>
          </SheetProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}

LogBox.ignoreAllLogs(); //Ignore all log notifications
