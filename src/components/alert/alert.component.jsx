import React from 'react'

import './alert.style.css';

export default function Alert({ alert }) {

    return (
        <div className="row mb-5">
            <div className="col-md-6 mx-md-auto">
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <a href={alert.image}>
                                <img className="img-fluid ms-2 my-2" src={alert.image} alt="person" />
                            </a>

                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title">{alert.category}</h5>
                                <h6>{alert.title}</h6>
                                <div className="card-text">
                                    <ul className="ul-style">
                                        <li>
                                            <span className="fw-bold">Name: </span>
                                            <span>{alert.name}</span>
                                        </li>
                                        <li>
                                            <span className="fw-bold">Age: </span>
                                            <span>{alert.age}</span>
                                        </li>
                                        <li>
                                            <span className="fw-bold">Height: </span>
                                            <span>{alert.height}</span>
                                        </li>
                                        <li>
                                            <span className="fw-bold">Skintone: </span>
                                            <span>{alert.skintone}</span>
                                        </li>
                                        <li>
                                            <span className="fw-bold">Eye Color: </span>
                                            <span>{alert.eyecolor}</span>
                                        </li>
                                        <li>
                                            <span className="fw-bold">Last Known Location: </span>
                                            <span>{alert.lastlocation}</span>
                                        </li>
                                        <li>
                                            <span className="fw-bold">More Details: </span>
                                            <span>{alert.details}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}