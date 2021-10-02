import * as React from 'react';

const LoadingIcon = (props) => {
    return (
        <div style={Style.container}>
            <i className={`glimpsicon glimpsicon-circle-02 ${props.sizeClass ? props.sizeClass : 'glimpsicon-32'} glimpsicon-is-spinning`} />
        </div>
    )
}

export default LoadingIcon

const Style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
}