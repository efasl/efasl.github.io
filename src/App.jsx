import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Fellowship from './components/Fellowship';
import FellowsDirectory from './components/FellowsDirectory';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import Contact from './components/Contact';
import YLPCohort from './components/YLPCohort';

function App() {
  // route = { tab: string, slug: string|null }
  const [route, setRoute] = useState({ tab: 'home', slug: null });

  const parseHash = () => {
    const raw = window.location.hash.replace('#/', '');
    // e.g. "news/some-slug" or "home"
    const [tab, ...rest] = raw.split('/');
    const slug = rest.length > 0 ? rest.join('/') : null;
    return { tab, slug };
  };

  useEffect(() => {
    const handleHashChange = () => {
      const { tab, slug } = parseHash();
      const validTabs = ['home', 'about', 'fellowship', 'fellows', 'news', 'contact', 'ylp'];
      if (validTabs.includes(tab)) {
        setRoute({ tab, slug });
        window.scrollTo(0, 0);
      } else {
        window.location.hash = '#/home';
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initial routing
    if (!window.location.hash || window.location.hash === '#/') {
      window.location.hash = '#/home';
    } else {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (tab) => {
    window.location.hash = `#/${tab}`;
  };

  const { tab, slug } = route;

  const renderContent = () => {
    switch (tab) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'about':
        return <About />;
      case 'fellowship':
        return <Fellowship navigateTo={navigateTo} />;
      case 'fellows':
        return <FellowsDirectory />;
      case 'news':
        // sub-route: #/news/{slug}
        return slug
          ? <NewsDetail slug={slug} navigateTo={navigateTo} />
          : <NewsList navigateTo={navigateTo} />;
      case 'ylp':
        // sub-route: #/ylp/{year}
        return <YLPCohort cohort={slug} navigateTo={navigateTo} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="app-container">
      <Header activeTab={tab} navigateTo={navigateTo} />
      <main className="main-content">
        {renderContent()}
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
}

export default App;
