import { BrowserRouter, Route, Routes } from "react-router-dom";

// Custom imports
import { ThemeProvider } from "@/context/ThemeContext.tsx";
import { AppContextProvider } from "@/context/AppContext.tsx";
import Quote from "@/pages/Quote.tsx";
import ROUTES from "@/constants/Routes.ts";
import Layout from "@/components/Layout.tsx";

// Custom styling
import "./styles/global.css";


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
