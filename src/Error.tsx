import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function Error(){
    const error = useRouteError();
    console.log(error);

    let errorMessage: string;
    if (isRouteErrorResponse(error)) {
        errorMessage=error.data;
    } else {
        errorMessage="Unknown error";
    }

    return (
        <div>
            <h1>Page not found :D</h1>
            <p>{errorMessage}</p>
        </div>
    );


}