import React from 'react';

function BlankLayout(a) { 
    console.log("a",a)
    return  <>{a.children}</>;
}

export default BlankLayout;
