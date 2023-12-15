import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../utils';
const Header = () => {
    let navigate = useNavigate();


    return (
        <div className="t11-top">
            <div className="t11-bar t11-white t11-wide t11-padding t11-card">
                <p href="#home" className="t11-bar-item t11-button" 
                    onClick={() => {
                        navigate(ROUTE_CONSTANTS.BASE)
                    }}
                >
                    <u>Advanced Software Engineering</u> Group <b>11</b>
                </p>
                <div className="t11-right t11-hide-small">
                    <p
                        className="t11-bar-item t11-button"
                        onClick={() => {
                            navigate(ROUTE_CONSTANTS.NQUEEN)
                        }}
                    >
                        N-Queen
                    </p>
                    <p
                        className="t11-bar-item t11-button"
                        onClick={() => { navigate(ROUTE_CONSTANTS.KANOODLE_PUZZLE) }}
                    > Polysphere
                    </p>
                    <p
                        className="t11-bar-item t11-button"
                        onClick={() => { navigate(ROUTE_CONSTANTS.POLYSPHERE_PYRAMID) }}
                    >
                        Polysphere Pyramid
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Header