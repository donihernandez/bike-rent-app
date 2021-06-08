import { css } from "@emotion/react";
import {PacmanLoader} from "react-spinners";


export default function LoaderComponent() {
    return (
        <div className="sweet-loading">
            <PacmanLoader  size={150} />
        </div>
    );

}