import React, { useEffect } from 'react';

export default function Frame() {
    useEffect(() => {
        window.parent.postMessage('closeFrame', '*');
    }, []);
    return (
        <main id="main" >
            <div>
                <h1>Frame</h1>
            </div>
        </main>
    );
    }

