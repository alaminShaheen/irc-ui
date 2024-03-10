import { BrowserRouter, Routes } from "react-router-dom";

// Custom imports
import BodyContent from "./components/BodyContent";
import Footer from "./components/Footer/Footer"
import { AppContextProvider } from "@/context/AppContext.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";

// Custom styling
import "./styles/global.css";


function App() {
    return (
        <BrowserRouter>
            <AppContextProvider>
                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                    <Routes>
                        {/* Declare Routes here */}
                    </Routes>
                    <BodyContent />
                    <Footer />
                </ThemeProvider>
            </AppContextProvider>
        </BrowserRouter>
    );
}

export default App;
