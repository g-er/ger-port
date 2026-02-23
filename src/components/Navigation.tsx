import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Navigation.css';

interface NavigationProps {
  onSidebarToggle: (open: boolean) => void;
  onNavigate?: (page: string) => void;
  onProjectClick?: (key: string) => void;
  activeProject?: string | null;
}

export default function Navigation({ onSidebarToggle, onNavigate, onProjectClick, activeProject }: NavigationProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const animatingRef = useRef(false);
  const location = useLocation();

  // Derive sidebar state from URL
  const vertical = location.pathname.startsWith('/projects');

  // --- Main (horizontal) nav items ---
  const mainItems = [
    { key: 'about', label: 'about', path: '/about' },
    { key: 'contact', label: 'contact', path: '/contact' },
    { key: 'projects', label: 'projects', path: '/projects/cycles' },
  ];

  // --- Sidebar (vertical) nav items ---
  const sidebarItems = [
    { key: 'cycles', label: 'cycles', path: '/projects/cycles' },
    { key: 'mee', label: 'MEE!', path: '/projects/mee' },
    { key: 'noah-choking', label: 'Noah, choking', path: '/projects/noah-choking' },
    { key: 'sld', label: 'SOCIAL LISTENING DEVICE', path: '/projects/sld' },
    { key: 'home', label: 'home', path: '/' },
  ];

  function handleMainClick(e: React.MouseEvent, key: string) {
    e.preventDefault();
    if (key === 'projects') {
      onSidebarToggle(true);
    } else {
      onNavigate?.(key);
    }
  }

  async function handleSidebarClick(e: React.MouseEvent, key: string) {
    e.preventDefault();
    if (animatingRef.current) return;

    if (key === 'home') {
      onSidebarToggle(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    animatingRef.current = true;
    onProjectClick?.(key);

    setTimeout(() => {
      animatingRef.current = false;
    }, 500);
  }

  return (
    <header ref={(r) => { headerRef.current = r; }} className={vertical ? 'nav-vertical' : ''}>
      <nav ref={(n) => { navRef.current = n; }}>
        {vertical
          ? sidebarItems.map((it) => (
              <a
                href={it.path}
                key={it.key}
                data-key={it.key}
                className={activeProject === it.key ? 'active' : ''}
                onClick={(e) => handleSidebarClick(e, it.key)}
              >
                {it.label}
              </a>
            ))
          : mainItems.map((it) => (
              <a
                href={it.path}
                key={it.key}
                data-key={it.key}
                onClick={(e) => handleMainClick(e, it.key)}
              >
                {it.label}
              </a>
            ))}
      </nav>
    </header>
  );
}
