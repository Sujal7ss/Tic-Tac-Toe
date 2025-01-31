import React from 'react';

export function Events({events}) {
    return (
        <ul>
            {
                events.map((eventt, index) => 
                <li key={index}>{ eventt }</li>
            )
            }
        </ul>
    )
}