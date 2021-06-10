import { css } from "@emotion/react";
import {PacmanLoader} from "react-spinners";


export default function LoaderComponent() {
    return (
        <div className="sweet-loading flex justify-center items-center h-screen">
            <PacmanLoader  />
        </div>
    );

}