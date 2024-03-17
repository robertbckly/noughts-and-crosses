import { createRoot } from 'react-dom/client';
import { Game } from './components/game';

const root = createRoot(document.getElementById('root')!);
root.render(<Game />);
