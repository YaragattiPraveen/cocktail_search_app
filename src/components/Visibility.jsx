import React from 'react'

function Visibility(props) {
    return (
        <>
            <div className='center_container'>
                <div className='card'>
                    <h3>{props.title}</h3>
                    <button onClick={props.hide}>X</button>
                    <p>{props.description}</p>
                </div>
            </div>
        </>
    )
}

export default Visibility;