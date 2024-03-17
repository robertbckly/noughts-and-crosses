import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Example } from './example';

it('renders', () => {
  render(<Example number={1} />);
  expect(screen.getByText(/^example 1$/i)).toBeVisible();
});
