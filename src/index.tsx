import { createRoot } from 'react-dom/client';
import { Example } from './components/example/example';
import LayoutExp from './components/layout-exp/layout-exp';

const root = createRoot(document.getElementById('root')!);
root.render(
  <>
    <Example number={1} />
    <LayoutExp />
  </>,
);
