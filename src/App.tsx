import { useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AppContextProvider } from "@/context/AppContext.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";


function App() {
    const [count, setCount] = useState(0);

    return (
        <BrowserRouter>
            <AppContextProvider>
                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                    <Routes>
                        {/* Declare Routes here */}
                    </Routes>

                    <div className="flex justify-center">
                        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                            <img src={viteLogo} className="logo" alt="Vite logo" />
                        </a>
                        <a href="https://react.dev" target="_blank" rel="noreferrer">
                            <img src={reactLogo} className="logo react" alt="React logo" />
                        </a>
                    </div>
                    <h1>Vite + React</h1>
                    <div className="card">
                        <button onClick={() => setCount((count) => count + 1)}>
                            count is {count}
                        </button>
                        <p>
                            Edit <code>src/App.tsx</code> and save to test HMR
                        </p>
                    </div>
                    <p className="read-the-docs">
                        Click on the Vite and React logos to learn more
                    </p>
                </ThemeProvider>
            </AppContextProvider>
        </BrowserRouter>
    );
}

export default App;
