import React, {useEffect, useState} from "react";
import "./style.scss";


type InputText2Props = {
    label?: string;
    placeholder?: string;
    value: string;
    setValue: (text: string) => void;
    maxLength?: number;
}

export function InputText2(props: InputText2Props) {

    const [inputText, setInputText] = useState(props.value);
    const [hasValue, setHasValue] = useState(props.value.length > 0);


    const isActive = (): boolean => {


        if (props.placeholder !== undefined) return true;

        if (hasValue) {
            return true;
        }

        return false;
    }
    useEffect(() => {
        console.log('InputText2 use effect', props.value);
        setInputText(props.value);
    }, [props.value]);
    // console.log("InputText2 ", props.value , isActive());

    let labelStyle = "intercars-common-input-label" + (props.placeholder !== undefined
        ? "__active"
        : hasValue ? "__active" : "");

    return (
        <div className="intercars-common-input-item">
            <div className={labelStyle}>{props.label}</div>
            {/*<div typeof={'label'}>фамилия</div>*/}
            <input name="common-input2"
                   placeholder={props.placeholder}
                   value={inputText}
                   onChange={(e) => {

                       let newValue = e.target.value;
                       if (props.maxLength !== undefined && newValue.length >props.maxLength) {
                           setInputText(inputText);
                           return;
                           // if (inputText.length === props.maxLength && e.target.value.length > props.maxLength)
                       }

                       setInputText(newValue);
                       if (newValue.length === 0) {
                           setHasValue(false);
                       } else if (newValue.length > 0 && !hasValue) {
                           setHasValue(true)
                       }
                       props.setValue(newValue);
                   }
                   }
            />
        </div>
    );
}