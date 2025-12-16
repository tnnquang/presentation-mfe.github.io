import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Slide, Navigation, TableOfContents } from './components';
import { slides, tocItems } from './slides';
import './index.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTOC, setShowTOC] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = slides.length;

  const handleNavigate = useCallback((slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlide(slideIndex);
    }
  }, [totalSlides]);

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

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <Slide
          key={currentSlide}
          variant={currentSlideData.variant}
          slideNumber={currentSlide + 1}
          totalSlides={totalSlides}
          title={currentSlideData.section}
        >
          {currentSlideData.content}
        </Slide>
      </AnimatePresence>

      <Navigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNavigate={handleNavigate}
        onToggleFullscreen={toggleFullscreen}
        onToggleTOC={toggleTOC}
        isFullscreen={isFullscreen}
      />

      <AnimatePresence>
        {showTOC && (
          <TableOfContents
            items={tocItems}
            currentSlide={currentSlide}
            isOpen={showTOC}
            onClose={() => setShowTOC(false)}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
