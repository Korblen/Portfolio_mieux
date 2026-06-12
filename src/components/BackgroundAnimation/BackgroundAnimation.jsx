import { useEffect } from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';
import './BackgroundAnimation.css';

const particlesOptions = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  detectRetina: true,
  fpsLimit: 60,
  fullScreen: {
    enable: false,
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      repulse: {
        distance: 90,
        duration: 0.35,
      },
    },
  },
  particles: {
    color: {
      value: ['#00ffea', '#3498db', '#ffffff'],
    },
    links: {
      color: '#00ffea',
      distance: 145,
      enable: true,
      opacity: 0.18,
      width: 1,
    },
    move: {
      direction: 'bottom-right',
      enable: true,
      outModes: {
        default: 'out',
      },
      random: false,
      speed: 0.55,
      straight: false,
      trail: {
        enable: false,
      },
    },
    number: {
      density: {
        enable: true,
        area: 900,
      },
      value: 72,
    },
    opacity: {
      value: {
        min: 0.25,
        max: 0.75,
      },
      animation: {
        enable: true,
        speed: 0.8,
        sync: false,
      },
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: {
        min: 1,
        max: 3.5,
      },
    },
  },
  responsive: [
    {
      maxWidth: 768,
      options: {
        interactivity: {
          events: {
            onHover: {
              enable: false,
            },
          },
        },
        particles: {
          links: {
            distance: 110,
            opacity: 0.14,
          },
          number: {
            value: 38,
          },
          move: {
            speed: 0.45,
          },
        },
      },
    },
  ],
};

const BackgroundAnimation = () => {
  useEffect(() => {
    let particlesContainer;
    let isMounted = true;

    const initParticles = async () => {
      await loadFull(tsParticles);

      if (!isMounted) {
        return;
      }

      particlesContainer = await tsParticles.load({
        id: 'portfolio-particles',
        options: particlesOptions,
      });
    };

    initParticles();

    return () => {
      isMounted = false;
      particlesContainer?.destroy();
    };
  }, []);

  return <div className="background-particles" id="portfolio-particles" aria-hidden="true" />;
};

export default BackgroundAnimation;
