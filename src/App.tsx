import { useRef, useState, useEffect, useCallback } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Cycles from './pages/Cycles';
import Mee from './pages/Mee';
import NoahChoking from './pages/NoahChoking';
import SLD from './pages/SLD';
import About from './pages/About';
import Contact from './pages/Contact';
import { useDitheredBorders } from './hooks/useDitheredBorders';
import './styles/global.css';

// IMPORTANT: Update this before deployment to PostVisible
// Format: '/portfolios/your-username'
// For local development, leave as '/'
const BASE_PATH = '/';

const PROJECT_KEYS = ['cycles', 'mee', 'noah-choking', 'sld'];

function AppContent() {
  const appRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const isScrollingRef = useRef(false);
  // Track whether the URL was changed by the observer (internal) vs browser navigation (external)
  const internalNavRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Derive state from URL
  const path = location.pathname.replace(/\/$/, '') || '/';
  const isProjectRoute = path.startsWith('/projects');
  const projectSlug = isProjectRoute ? path.split('/')[2] || null : null;
  const activePage = path === '/about' ? 'about' : path === '/contact' ? 'contact' : null;
  const sidebarOpen = isProjectRoute;

  const [activeProject, setActiveProject] = useState<string | null>(
    projectSlug && PROJECT_KEYS.includes(projectSlug) ? projectSlug : (isProjectRoute ? 'cycles' : null)
  );

  // Attach dithered particle borders to nav links only
  useDitheredBorders(appRef, 'nav a');

  // Sync activeProject when URL changes (e.g. direct link, back/forward navigation)
  useEffect(() => {
    // Skip if this URL change was caused by the observer or a click handler
    if (internalNavRef.current) {
      internalNavRef.current = false;
      return;
    }

    if (isProjectRoute) {
      if (projectSlug && PROJECT_KEYS.includes(projectSlug)) {
        setActiveProject(projectSlug);
        // Scroll to the project after a brief delay for rendering
        setTimeout(() => {
          const target = document.getElementById(projectSlug);
          if (target) {
            isScrollingRef.current = true;
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => { isScrollingRef.current = false; }, 800);
          }
        }, 100);
      } else {
        setActiveProject('cycles');
      }
    } else {
      setActiveProject(null);
    }
  }, [path, isProjectRoute, projectSlug]);

  // IntersectionObserver: track which project section is in view
  useEffect(() => {
    if (!sidebarOpen || !mainRef.current) return;

    const container = mainRef.current;
    const sections = container.querySelectorAll<HTMLElement>('section[id]');
    if (sections.length === 0) return;

    // Suppress the observer's initial fire so it doesn't override activeProject
    let mounted = false;
    requestAnimationFrame(() => { mounted = true; });

    // Track the latest ratio for every section so we can always pick the most visible
    const ratios = new Map<string, number>();
    sections.forEach((s) => ratios.set(s.id, 0));
    let currentId: string | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current || !mounted) return;

        // Update ratios for every reported entry
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        // Pick the section with the highest ratio
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId && bestRatio > 0 && bestId !== currentId) {
          currentId = bestId;
          setActiveProject(bestId);
          internalNavRef.current = true;
          navigate(`/projects/${bestId}`, { replace: true });
        }
      },
      {
        root: container,
        // Multiple thresholds so the callback fires frequently during scroll
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [sidebarOpen, navigate]);

  const handleNavigate = useCallback((page: string) => {
    navigate(`/${page}`);
  }, [navigate]);

  const handleProjectClick = useCallback((key: string) => {
    isScrollingRef.current = true;
    setActiveProject(key);
    internalNavRef.current = true;
    navigate(`/projects/${key}`, { replace: true });

    // Use scrollIntoView on the section element — works regardless of offsetTop calculation
    const scroll = () => {
      const target = document.getElementById(key);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // If sections are already mounted, scroll immediately; otherwise wait one frame
    if (document.getElementById(key)) {
      scroll();
    } else {
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  }, [navigate]);

  const handleSidebarToggle = useCallback((open: boolean) => {
    if (open) {
      setActiveProject('cycles');
      navigate('/projects/cycles');
    } else {
      setActiveProject(null);
      navigate('/');
    }
  }, [navigate]);

  return (
    <div ref={appRef} className={`app-root${sidebarOpen ? ' sidebar-open' : ''}`}>
      <Navigation onSidebarToggle={handleSidebarToggle} onNavigate={handleNavigate} onProjectClick={handleProjectClick} activeProject={activeProject} />

      {/* Top-level pages (about, contact) shown outside sidebar mode */}
      {!sidebarOpen && activePage === 'about' && (
        <main className="main-content page-visible">
          <About />
        </main>
      )}
      {!sidebarOpen && activePage === 'contact' && (
        <main className="main-content page-visible">
          <Contact />
        </main>
      )}

      {/* Project sections — only shown in sidebar mode */}
      {sidebarOpen && (
        <main className="main-content" ref={mainRef}>
          <section id="cycles">
            <Cycles />
          </section>
          <section id="mee">
            <Mee />
          </section>
          <section id="noah-choking">
            <NoahChoking />
          </section>
          <section id="sld">
            <SLD />
          </section>
        </main>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={BASE_PATH}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
