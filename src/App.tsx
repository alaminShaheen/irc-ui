import { BrowserRouter, Route, Routes } from "react-router-dom";

// Custom imports
import Quote from "@/pages/Quote";
import ROUTES from "@/constants/Routes";
import Layout from "@/components/Layout/Layout";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppContextProvider } from "@/context/AppContext";

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
