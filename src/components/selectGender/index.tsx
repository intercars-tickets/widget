import "./style.scss";
import React, {useState} from "react";

type SelectGenderProps = {
    gender: "male" | "female";
    selectGender: (gender: "male" | "female") => void;
}

export function SelectGender (props: SelectGenderProps) {

    const [gender,setGender] = useState<"male"|"female">(props.gender);

   const isActive= (value:"male"|"female")=>value===gender?"intercars-gender-select-item__active":"intercars-gender-select-item";
    return (
        <div className="intercars-gender-select-container">
            <div className={isActive("male")}
                 onClick={() => {
                     setGender("male");
                     props.selectGender("male")
                 }}
            >M</div>
            <div className={isActive("female")}
                 onClick={() => {
                     setGender("female");
                     props.selectGender("female")
                 }}
            >F</div>
        </div>)
}