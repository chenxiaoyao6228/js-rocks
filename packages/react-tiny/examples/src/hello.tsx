// need to execute build command bebore import
// import { h } from '@js-rocks/react-tiny';

import { h, createRoot } from '../../src/index';

function App() {
    return <div>Tester</div>;
}
createRoot(document.getElementById('root') as HTMLElement).render(<App />);

