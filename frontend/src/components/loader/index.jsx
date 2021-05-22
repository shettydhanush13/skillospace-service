import React from "react"
import "./styles.scss"

const Loader = () => {
    return (
        <div className="page-loader">
            <img src={require("../../assets/images/loader.gif").default} alt="loader image" />
        </div>
    )
}

export default Loader