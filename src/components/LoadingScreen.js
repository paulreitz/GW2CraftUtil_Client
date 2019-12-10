import React from 'react';

const LoadingScreen = ({ message }) => (
    <div className="loading-screen">
        <div className="loading-screen__container">
            <img src="/images/805.svg" width="200" height="200" className="loading-screen__spinner" />
            <div>{message}</div>
        </div>
    </div>
);

export default LoadingScreen;