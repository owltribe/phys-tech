import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "providers/AuthProvider";
import { ReactQueryClientProvider } from "providers/ReactQueryProvider";

import theme from "./src/styles/theme";
import Router from "./Router";

export default function App() {
  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <Router />
        </PaperProvider>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}
