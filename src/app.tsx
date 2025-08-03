import React, {useEffect, useState} from "react";
import {Widget} from "./widget";

export function App (){
   //  console.log("App",  );
   // // const [params, setParams] = useState({});
   //  let params = document.getElementById("searchContainer").getAttribute("data-intercars");
   //  console.log("attribute:",  params.toString());
    console.log("params")
    try{
        let params = document.getElementById("searchContainer").getAttribute("data-intercars");
        console.log(params);

    }
    catch(e){

    }

    return (<>
         <Widget/>
    </>)
}