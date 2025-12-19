import { useCallback, useEffect, useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Slide, Navigation, TableOfContents } from './components';
import { slides, tocItems, getSlideBySlug, getSlugForSlide } from './slides';
import './index.css';

// Slide view component with route params
function SlideView() {
  const { slideSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showTOC, setShowTOC] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Find slide by slug and get index
  const { currentSlideData, slideIndex } = useMemo(() => {
    if (!slideSlug) return { currentSlideData: slides[0], slideIndex: 0 };

    // Parse index from slug (e.g., "9-module-federation" -> index 8)
    const indexMatch = slideSlug.match(/^(\d+)-/);
    if (indexMatch) {
      const displayNum = parseInt(indexMatch[1], 10);
      const idx = displayNum - 1; // Convert to 0-based
      if (idx >= 0 && idx < slides.length) {
        return { currentSlideData: slides[idx], slideIndex: idx };
      }
    }

    // Fallback: find by slug content
    const found = getSlideBySlug(slideSlug, slides);
    const foundIdx = found ? slides.indexOf(found) : 0;
    return { currentSlideData: found || slides[0], slideIndex: foundIdx >= 0 ? foundIdx : 0 };
  }, [slideSlug]);

  const totalSlides = slides.length;

  // Calculate section slide numbers
  const sectionInfo = useMemo(() => {
    const section = currentSlideData.section;
    if (!section) return { current: 0, total: 0 };

    const slidesInSection = slides.filter(s => s.section === section);
    const currentIndexInSection = slidesInSection.findIndex(s => s === currentSlideData);
    return {
      current: currentIndexInSection + 1,
      total: slidesInSection.length
    };
  }, [currentSlideData]);

  // Generate slug map for navigation
  const slugs = useMemo(() => slides.map(s => getSlugForSlide(s, slides)), []);

  const handleNavigate = useCallback((newSlideIndex: number) => {
    if (newSlideIndex >= 0 && newSlideIndex < totalSlides) {
      navigate(`/slide/${slugs[newSlideIndex]}`);
    }
  }, [totalSlides, navigate, slugs]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const toggleTOC = useCallback(() => {
    setShowTOC(prev => !prev);
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Close TOC on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showTOC) {
        setShowTOC(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTOC]);

  return (
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <Slide
          key={location.pathname}
          variant={currentSlideData.variant}
          slideNumber={slideIndex + 1}
          totalSlides={totalSlides}
          title={currentSlideData.section}
          sectionSlideNumber={sectionInfo.current}
          sectionTotalSlides={sectionInfo.total}
        >
          {currentSlideData.content}
        </Slide>
      </AnimatePresence>

      <Navigation
        currentSlide={slideIndex}
        totalSlides={totalSlides}
        onNavigate={handleNavigate}
        onToggleFullscreen={toggleFullscreen}
        onToggleTOC={toggleTOC}
        isFullscreen={isFullscreen}
        slideTitles={slides.map(s => s.title)}
      />

      <AnimatePresence>
        {showTOC && (
          <TableOfContents
            items={tocItems}
            currentSlide={slideIndex}
            isOpen={showTOC}
            onClose={() => setShowTOC(false)}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  // Get first slide slug for redirect
  const firstSlug = getSlugForSlide(slides[0]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/slide/${firstSlug}`} replace />} />
        <Route path="/slide/:slideSlug" element={<SlideView />} />
        <Route path="*" element={<Navigate to={`/slide/${firstSlug}`} replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
