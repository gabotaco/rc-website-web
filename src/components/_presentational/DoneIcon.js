import * as React from 'react';

const DoneIcon = (props) => {
    return (
        <div style={Style.container}>
            <i className={`glimpsicon glimpsicon-check-single ${props.sizeClass ? props.sizeClass : 'glimpsicon-64'}`} />
        </div>
    )
}

export default DoneIcon

const Style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
}