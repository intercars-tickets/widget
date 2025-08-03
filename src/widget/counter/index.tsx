import "./style.scss";
import React, {useEffect, useState} from "react";
import {DecrementIcon} from "../../icons/DecrementIcon";
import {IncrementIcon} from "../../icons/IncrementIcon";


interface ICounterProps {

    className?: string;
    initialStateValue?: number,
    getCountValue?: (value: number) => void;
}
export function Counter ({className, initialStateValue, getCountValue}:ICounterProps)  {


    const [count, setCount] = useState(initialStateValue !== undefined ? initialStateValue :0);

    useEffect(() => {
        if (getCountValue) {
            getCountValue(count);
        }
    }, [count]);
    return (
        <div className={`counter ${className}`}>
            <button type='button' name='decrement'
                    id='decrement'
                    className='counter__btn'
                    onClick={() => setCount((prev) => prev - 1)}
                    disabled={count < 1 ? true : false}
            >
                <DecrementIcon/>
            </button>
            <div className='counter__value'>
                {count}
            </div>
            <button type='button' name='increment' id='increment'
                    className='counter__btn'
                    onClick={() => setCount((prev) => prev + 1)}>
                <IncrementIcon/>
            </button>
        </div>
    );
}

