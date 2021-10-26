import React,{useState, createContext} from 'react';

export const FrontEndContext = createContext();

export const FrontendUrlProvider = (props) => {
    let current_url = 'https://givealot.netlify.app'
    return(
        <FrontEndContext.Provider value={current_url}>
            {props.children}
        </FrontEndContext.Provider>
    )
}
