import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock the components that use canvas/physics
jest.mock('./components/CharmShowcase', () => {
  return function MockCharmShowcase() {
    return <div data-testid="charm-showcase-mock">Charm Showcase</div>;
  };
});

describe('Home Page', () => {
  it('renders the main heading correctly', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /Bring a little magic/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('contains download links', () => {
    render(<Home />);
    const getLink = screen.getByRole('link', { name: /Get Lucky Dangle/i });
    const meetLink = screen.getByRole('link', { name: /Meet the charms/i });
    expect(getLink).toBeInTheDocument();
    expect(meetLink).toBeInTheDocument();
  });

  it('renders core features', () => {
    render(<Home />);
    expect(screen.getByText(/Natural physics/i)).toBeInTheDocument();
    expect(screen.getByText(/Made by you/i)).toBeInTheDocument();
    expect(screen.getByText(/A world to collect/i)).toBeInTheDocument();
    expect(screen.getByText(/Deep Automation/i)).toBeInTheDocument();
  });
});
