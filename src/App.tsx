import { BrowserRouter, Route, Routes } from "react-router-dom";

// Custom imports
import { AppContextProvider } from "@/context/AppContext.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";
import Quote from "@/pages/Quote.tsx";

// Custom styling
import "./styles/global.css";
import ROUTES from "@/constants/Routes.ts";
import Layout from "@/components/Layout.tsx";


function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Layout>
            <Routes>
              <Route path={ROUTES.QUOTE} element={<Quote />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
