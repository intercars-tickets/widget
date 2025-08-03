import './style.scss'
import React, {CSSProperties, useEffect, useState} from "react";

interface ButtonProps {
    type?: "reset" | "submit" | "button";
    icon?: any;
    title: string;
    style?: { [selector: string]: CSSProperties }
    children?: any;
    disabled?: boolean;
    onClick?: () => void;
    tabIndex?: number;
}

export function Button(props: ButtonProps) {

    const [isAnimated, setIsAnimated] = useState(false);
    const onMouseDown = (event: React.MouseEvent) => {

        if (event.button !== 0) return;

        let button = event.target as HTMLButtonElement;

        let rect = button.getBoundingClientRect();

        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        let inkNode = button.querySelector('.md-button-ink') as HTMLElement;

        if (inkNode != null && !inkNode.classList.contains('--ink-active')) {
            inkNode.style.left = (x - Math.max(rect.width, rect.height)) + 'px';
            inkNode.style.top = (y - Math.max(rect.width, rect.height)) + 'px';
            inkNode.style.width = (Math.max(rect.width, rect.height) * 2) + 'px';
            inkNode.style.height = (Math.max(rect.width, rect.height) * 2) + 'px';
            inkNode.classList.add('--ink-active');
            setTimeout(() => {
                inkNode.classList.remove('--ink-active');
            }, 400);
        }
    }

    const buttonStyle = "intercars-common-button" + (isAnimated ? " animated" : "");

    return (
            <button className={buttonStyle} type="button"
                    onMouseOver={() => {
                        setIsAnimated(true)
                        setTimeout(()=>{setIsAnimated(false) }, 500);
                    }}

                    onMouseDown={() => {
                        console.log("on focus")

                        setIsAnimated(true)
                        props.onClick && props.onClick();
                    }}
                    onMouseLeave={() => {
                        console.log("on mouse")
                    }}
            >{props.title}
            </button>



    );
}