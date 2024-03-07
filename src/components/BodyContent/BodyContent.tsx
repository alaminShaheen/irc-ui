import {useState} from 'react';

// Custom imports
import { IBodyContentProps } from './BodyContent.d';

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// Custom styling
const TW_CLASS_NAMES = {
  single: 'h-[90px] w-screen   lg:w-[728px] ',
  multiple: 'h-[250px] w-[300px]',
};


const BodyContent = ({}: IBodyContentProps) => {
    const [count, setCount] = useState<number>(0);
  
  return (
    <>
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
            <button onClick={() => setCount((count: number) => count + 1)}>
                count is {count}
            </button>
            <p>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
        <p className="read-the-docs">
            Click on the Vite and React logos to learn more
        </p>
    </>
  );
};

export default BodyContent;
