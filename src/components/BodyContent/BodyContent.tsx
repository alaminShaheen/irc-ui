import {useState} from 'react';

// Custom imports
import { IBodyContentProps } from './BodyContent.d';

// Custom styling
const TW_CLASS_NAMES = {
  single: 'h-[90px] w-screen   lg:w-[728px] ',
  multiple: 'h-[250px] w-[300px]',
};


const BodyContent = ({}: IBodyContentProps) => {
    const [count, setCount] = useState<number>(0);
  
  return (
    <>
        <div className="card">
            
        </div>
    </>
  );
};

export default BodyContent;
