import React, { useEffect } from "react";
 
import { useAuth } from "react-use-auth";
 
const Auth0CallbackPage = () => {
    const { handleAuthentication } = useAuth();
    useEffect(() => {
        handleAuthentication();
    }, []);
 
    return (
 
            <p>
              Loading ...
            </p>
   
    );
};
 
export default Auth0CallbackPage;