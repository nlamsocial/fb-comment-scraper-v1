import React from 'react';

import EnterKeyword from './EnterKeyword';
import ListKeyword from './ListKeyword';

const App = () => {
    return (
        <div className="wrapper" style={{ width: '500px' }}>
            <EnterKeyword />
            <ListKeyword />
        </div>
    );
};

export default App;
