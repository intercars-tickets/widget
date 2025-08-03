import { createRoot } from 'react-dom/client';
import React from "react";
import {App} from "./app";
import {render} from "sass";

// Clear the existing HTML content
//document.body.innerHTML = '<div id="widgetIntercars"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('searchContainer'));
root.render( <App/>);

