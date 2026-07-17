import { render, screen } from '@testing-library/react';
import App from './App';

test('renders report title', () => {
  render(<App />);
  const titleElement = screen.getByText(/APIMS Operations and Monitoring/i);
  expect(titleElement).toBeInTheDocument();
});
