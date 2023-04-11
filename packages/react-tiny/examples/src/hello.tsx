// need to execute build command bebore import
// import { h } from '@js-rocks/react-tiny';

import { h, createRoot, useState } from '../../src/index';

function App() {
    const [num, setNum] = useState(1);
    window.setNum = setNum;
    return <div>{num}</div>;
}
createRoot(document.getElementById('root') as HTMLElement).render(<App />);
