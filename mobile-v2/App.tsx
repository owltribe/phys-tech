import { LogBox } from "react-native";
import { PaperProvider } from "react-native-paper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AuthProvider } from "providers/AuthProvider";
import { ReactQueryClientProvider } from "providers/ReactQueryProvider";

import theme from "./src/styles/theme";
import Router from "./Router";

export default function App() {
  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <BottomSheetModalProvider>
          <PaperProvider theme={theme}>
            <Router />
          </PaperProvider>
        </BottomSheetModalProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}

LogBox.ignoreAllLogs(); //Ignore all log notifications
