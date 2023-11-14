import { render, screen } from '@testing-library/react';
import React from 'react';

describe('App', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should log "Web workers are supported" if Web workers are supported', () => {
    const mockWorker = jest.fn();
    global.Worker = mockWorker;

    const App = require('./App').default;
    render(<App />);

    expect(mockWorker).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Web workers are supported');
  });

  test('should not log "Web workers are supported" if Web workers are not supported', () => {
    const App = require('./App').default;
    render(<App />);

    expect(console.log).not.toHaveBeenCalledWith('Web workers are supported');
  });
});
```