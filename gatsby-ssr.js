// gatsby-browser.js
 
import React from "react";
import { navigate } from "gatsby";
 
import { AuthProvider } from "react-use-auth";
 
export const wrapRootElement = ({ element }) => (
    <AuthProvider
        navigate={navigate}
        auth0_domain="dev-nknoumme.eu.auth0.com"
        auth0_client_id="74NrKL9zB0stCyTOje3kKE47W3zUVztP"
    >
        {element}
    </AuthProvider>
);