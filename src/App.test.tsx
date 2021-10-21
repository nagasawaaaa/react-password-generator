import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('アプリが正常に立ち上がるか', () => {
  render(<App />);
  const expectText = screen.getByText(/The password you created will be copied by clicking./i);
  expect(expectText).toBeInTheDocument();
});
