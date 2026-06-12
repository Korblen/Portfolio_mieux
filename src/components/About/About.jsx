import './About.css';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FaCloud,
  FaDatabase,
  FaGamepad,
  FaKeyboard,
  FaLanguage,
  FaLaptopCode,
  FaLinux,
  FaMusic,
  FaNetworkWired,
  FaPython,
  FaServer,
  FaShieldAlt,
  FaTerminal,
  FaWindows,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Modal from '../Modal/Modal';
import japaneseFlag from '/assets/flags/japanese.png';
import englishFlag from '/assets/flags/english.png';
import frenchFlag from '/assets/flags/french.png';
import italianFlag from '/assets/flags/italian.png';

const skillIcons = [
  FaServer,
  FaNetworkWired,
  FaShieldAlt,
  FaLinux,
  FaWindows,
  FaPython,
  FaTerminal,
  FaDatabase,
  FaCloud,
];

const interestIcons = [FaKeyboard, FaMusic, FaLaptopCode, FaGamepad, FaLanguage];

const pianoNotes = [
  { note: 'C4', label: 'Do', key: 'A', frequency: 261.63, type: 'white' },
  { note: 'D4', label: 'Ré', key: 'Z', frequency: 293.66, type: 'white' },
  { note: 'E4', label: 'Mi', key: 'E', frequency: 329.63, type: 'white' },
  { note: 'F4', label: 'Fa', key: 'R', frequency: 349.23, type: 'white' },
  { note: 'G4', label: 'Sol', key: 'T', frequency: 392.00, type: 'white' },
  { note: 'A4', label: 'La', key: 'Y', frequency: 440.00, type: 'white' },
  { note: 'B4', label: 'Si', key: 'U', frequency: 493.88, type: 'white' },
];

const technoLeadNotes = [392.00, 493.88, 587.33, 739.99, 659.25, 587.33, 493.88, 440.00];
const technoBassNotes = [98.00, 98.00, 123.47, 98.00, 146.83, 123.47, 98.00, 82.41];
const equalizerBars = Array.from({ length: 30 }, (_, index) => index);
const gameWidth = 860;
const gameHeight = 430;

const languages = [
  {
    code: 'fr',
    flag: frenchFlag,
    alt: 'Drapeau Français',
  },
  {
    code: 'en',
    flag: englishFlag,
    alt: 'Drapeau Anglais',
  },
  {
    code: 'ja',
    flag: japaneseFlag,
    alt: 'Drapeau Japonais',
  },
  {
    code: 'it',
    flag: italianFlag,
    alt: 'Drapeau Italien',
  },
];

const About = ({ currentLanguage, onLanguageChange, labels }) => {
  const [isPianoOpen, setIsPianoOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState([]);
  const [gameScore, setGameScore] = useState(0);
  const [gameBestScore, setGameBestScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('ready');
  const audioContextRef = useRef(null);
  const terminalInputRef = useRef(null);
  const gameCanvasRef = useRef(null);
  const gameAnimationRef = useRef(null);
  const gameStateRef = useRef(null);
  const gameStatusRef = useRef('ready');
  const gameBestScoreRef = useRef(0);
  const canHover = typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const skillMotion = canHover
    ? {
        whileHover: { scale: 1.1 },
        transition: { type: 'spring', stiffness: 300 },
      }
    : {};

  const interestMotion = canHover
    ? {
        whileHover: { scale: 1.05 },
        transition: { type: 'spring', stiffness: 300 },
      }
    : {};

  const playNote = useCallback((note) => {
    if (!canHover) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(note.frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.38, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.6);

    setActiveNote(note.note);
    window.setTimeout(() => setActiveNote((currentNote) => (
      currentNote === note.note ? null : currentNote
    )), 150);
  }, [canHover]);

  const playMusicPulse = useCallback(() => {
    if (!canHover) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const audioContext = audioContextRef.current;
    const now = audioContext.currentTime;
    const step = 0.135;

    const masterGain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(5800, now);
    filter.Q.setValueAtTime(0.9, now);
    masterGain.gain.setValueAtTime(0.72, now);
    filter.connect(masterGain);
    masterGain.connect(audioContext.destination);

    const playKick = (start) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(150, start);
      oscillator.frequency.exponentialRampToValueAtTime(44, start + 0.16);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.85, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);

      oscillator.connect(gain);
      gain.connect(filter);
      oscillator.start(start);
      oscillator.stop(start + 0.3);
    };

    const playBass = (frequency, start) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const bassFilter = audioContext.createBiquadFilter();

      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(frequency, start);
      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(620, start);
      bassFilter.Q.setValueAtTime(8, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.22, start + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);

      oscillator.connect(bassFilter);
      bassFilter.connect(gain);
      gain.connect(filter);
      oscillator.start(start);
      oscillator.stop(start + 0.25);
    };

    const playHat = (start) => {
      const bufferSize = audioContext.sampleRate * 0.08;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      const hatFilter = audioContext.createBiquadFilter();

      for (let i = 0; i < bufferSize; i += 1) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }

      hatFilter.type = 'highpass';
      hatFilter.frequency.setValueAtTime(7200, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.075);

      source.buffer = buffer;
      source.connect(hatFilter);
      hatFilter.connect(gain);
      gain.connect(filter);
      source.start(start);
      source.stop(start + 0.08);
    };

    const playLead = (frequency, start, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const delay = audioContext.createDelay();
      const delayGain = audioContext.createGain();

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(frequency, start);
      oscillator.detune.setValueAtTime(index % 2 === 0 ? 8 : -8, start);
      delay.delayTime.setValueAtTime(0.09, start);
      delayGain.gain.setValueAtTime(0.18, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.16, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);

      oscillator.connect(gain);
      gain.connect(filter);
      gain.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(filter);
      oscillator.start(start);
      oscillator.stop(start + 0.2);
    };

    technoLeadNotes.forEach((frequency, index) => {
      const start = now + index * step;

      if (index % 2 === 0) {
        playKick(start);
      }

      playBass(technoBassNotes[index], start + 0.035);
      playHat(start + step * 0.5);
      playLead(frequency, start + 0.012, index);
    });

    setIsMusicPlaying(true);
    window.setTimeout(() => setIsMusicPlaying(false), 1800);
  }, [canHover]);

  const resetTerminal = useCallback(() => {
    setTerminalInput('');
    setTerminalLines([
      { type: 'system', text: labels.terminalEasterEgg.welcome },
      { type: 'system', text: labels.terminalEasterEgg.hint },
    ]);
  }, [labels.terminalEasterEgg.hint, labels.terminalEasterEgg.welcome]);

  const runTerminalCommand = (event) => {
    event.preventDefault();

    const command = terminalInput.trim().toLowerCase();

    if (!command) return;

    if (command === 'clear') {
      resetTerminal();
      return;
    }

    setTerminalLines((currentLines) => [
      ...currentLines,
      { type: 'command', text: `malo@portfolio:~$ ${command}` },
      {
        type: 'output',
        text: labels.terminalEasterEgg.commands[command] || labels.terminalEasterEgg.unknown,
      },
    ]);
    setTerminalInput('');
  };

  const setGameMode = useCallback((status) => {
    gameStatusRef.current = status;
    setGameStatus(status);
  }, []);

  const resetGame = useCallback((status = 'ready') => {
    gameStateRef.current = {
      packetY: gameHeight / 2,
      packetVelocity: 0,
      frame: 0,
      score: 0,
      obstacles: [
        { x: 620, gapY: 168, passed: false },
        { x: 940, gapY: 236, passed: false },
      ],
      particles: [],
    };
    setGameScore(0);
    setGameMode(status);
  }, [setGameMode]);

  const jumpPacket = useCallback(() => {
    if (!canHover) return;

    if (!gameStateRef.current || gameStatusRef.current === 'over') {
      resetGame('running');
    } else if (gameStatusRef.current === 'ready') {
      setGameMode('running');
    }

    gameStateRef.current.packetVelocity = -8.2;
  }, [canHover, resetGame, setGameMode]);

  useEffect(() => {
    if (!isPianoOpen || !canHover) return undefined;

    const handleKeyDown = (event) => {
      if (event.repeat) return;

      const note = pianoNotes.find((pianoNote) => (
        pianoNote.key.toLowerCase() === event.key.toLowerCase()
      ));

      if (note) {
        event.preventDefault();
        playNote(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPianoOpen, canHover, playNote]);

  useEffect(() => {
    if (!isTerminalOpen) return;

    resetTerminal();
    window.setTimeout(() => terminalInputRef.current?.focus(), 80);
  }, [isTerminalOpen, resetTerminal]);

  useEffect(() => {
    if (!isGameOpen || !canHover) return undefined;

    const canvas = gameCanvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return undefined;

    resetGame('ready');

    const drawRoundedRect = (x, y, width, height, radius) => {
      context.beginPath();
      context.roundRect(x, y, width, height, radius);
      context.fill();
    };

    const drawBackground = (state) => {
      const gradient = context.createLinearGradient(0, 0, gameWidth, gameHeight);

      gradient.addColorStop(0, '#06101c');
      gradient.addColorStop(0.55, '#101a2a');
      gradient.addColorStop(1, '#06101c');
      context.fillStyle = gradient;
      context.fillRect(0, 0, gameWidth, gameHeight);

      context.strokeStyle = 'rgba(0, 255, 234, 0.08)';
      context.lineWidth = 1;

      for (let x = -(state.frame % 40); x < gameWidth; x += 40) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, gameHeight);
        context.stroke();
      }

      for (let y = 34; y < gameHeight; y += 34) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(gameWidth, y);
        context.stroke();
      }
    };

    const drawPacket = (state) => {
      const x = 132;
      const y = state.packetY;
      const tilt = Math.max(-0.55, Math.min(0.55, state.packetVelocity / 14));

      context.save();
      context.translate(x, y);
      context.rotate(tilt);
      context.fillStyle = '#00ffea';
      context.shadowColor = 'rgba(0, 255, 234, 0.7)';
      context.shadowBlur = 18;
      drawRoundedRect(-24, -17, 48, 34, 9);
      context.shadowBlur = 0;
      context.fillStyle = '#121720';
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('IP', 0, 1);
      context.restore();

      context.fillStyle = 'rgba(0, 255, 234, 0.12)';
      state.particles.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
    };

    const drawObstacle = (obstacle) => {
      const gapHeight = 138;
      const firewallWidth = 74;
      const topHeight = obstacle.gapY - gapHeight / 2;
      const bottomY = obstacle.gapY + gapHeight / 2;
      const bottomHeight = gameHeight - bottomY;

      context.fillStyle = '#172337';
      drawRoundedRect(obstacle.x, 0, firewallWidth, topHeight, 12);
      drawRoundedRect(obstacle.x, bottomY, firewallWidth, bottomHeight, 12);

      context.fillStyle = '#ff4dc4';
      for (let y = 16; y < topHeight - 12; y += 28) {
        context.fillRect(obstacle.x + 12, y, firewallWidth - 24, 5);
      }
      for (let y = bottomY + 16; y < gameHeight - 12; y += 28) {
        context.fillRect(obstacle.x + 12, y, firewallWidth - 24, 5);
      }

      context.fillStyle = '#00ffea';
      context.font = 'bold 11px Arial';
      context.textAlign = 'center';
      context.fillText('FW', obstacle.x + firewallWidth / 2, topHeight + 22);
      context.fillText('FW', obstacle.x + firewallWidth / 2, bottomY - 12);
    };

    const drawOverlay = (state) => {
      context.fillStyle = '#ffffff';
      context.font = 'bold 18px Arial';
      context.textAlign = 'left';
      context.fillText(`${labels.gameEasterEgg.score}: ${state.score}`, 22, 34);
      context.fillText(`${labels.gameEasterEgg.best}: ${gameBestScoreRef.current}`, 22, 60);

      if (gameStatusRef.current !== 'running') {
        context.fillStyle = 'rgba(5, 8, 13, 0.68)';
        context.fillRect(0, 0, gameWidth, gameHeight);
        context.textAlign = 'center';
        context.fillStyle = '#00ffea';
        context.font = 'bold 42px Arial';
        context.fillText(labels.gameEasterEgg.title, gameWidth / 2, 178);
        context.fillStyle = '#ffffff';
        context.font = 'bold 19px Arial';
        context.fillText(
          gameStatusRef.current === 'over' ? labels.gameEasterEgg.gameOver : labels.gameEasterEgg.hint,
          gameWidth / 2,
          222
        );
        context.fillStyle = 'rgba(255, 255, 255, 0.74)';
        context.font = 'bold 16px Arial';
        context.fillText(
          gameStatusRef.current === 'over' ? labels.gameEasterEgg.restart : labels.gameEasterEgg.start,
          gameWidth / 2,
          260
        );
      }
    };

    const tick = () => {
      const state = gameStateRef.current;

      if (!state) return;

      drawBackground(state);

      if (gameStatusRef.current === 'running') {
        state.frame += 1;
        state.packetVelocity += 0.42;
        state.packetY += state.packetVelocity;
        state.particles.push({
          x: 106,
          y: state.packetY + (Math.random() * 22 - 11),
          size: 2 + Math.random() * 3,
        });
        state.particles = state.particles
          .map((particle) => ({ ...particle, x: particle.x - 4, size: particle.size * 0.96 }))
          .filter((particle) => particle.x > 0 && particle.size > 0.8);

        state.obstacles.forEach((obstacle) => {
          obstacle.x -= 3.7;

          if (!obstacle.passed && obstacle.x + 74 < 132) {
            obstacle.passed = true;
            state.score += 1;
            setGameScore(state.score);
            setGameBestScore((currentBest) => {
              const nextBest = Math.max(currentBest, state.score);
              gameBestScoreRef.current = nextBest;
              return nextBest;
            });
          }
        });

        if (state.obstacles[0].x < -92) {
          state.obstacles.shift();
          state.obstacles.push({
            x: state.obstacles[state.obstacles.length - 1].x + 315,
            gapY: 110 + Math.random() * 210,
            passed: false,
          });
        }

        const packetBox = { x: 108, y: state.packetY - 17, width: 48, height: 34 };
        const hitWall = state.packetY < 24 || state.packetY > gameHeight - 24;
        const hitObstacle = state.obstacles.some((obstacle) => {
          const gapHeight = 138;
          const overlapsX = packetBox.x + packetBox.width > obstacle.x && packetBox.x < obstacle.x + 74;
          const outsideGap = packetBox.y < obstacle.gapY - gapHeight / 2 || packetBox.y + packetBox.height > obstacle.gapY + gapHeight / 2;

          return overlapsX && outsideGap;
        });

        if (hitWall || hitObstacle) {
          setGameMode('over');
        }
      }

      gameStateRef.current.obstacles.forEach(drawObstacle);
      drawPacket(gameStateRef.current);
      drawOverlay(gameStateRef.current);
      gameAnimationRef.current = window.requestAnimationFrame(tick);
    };

    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        jumpPacket();
      }
    };

    canvas.addEventListener('click', jumpPacket);
    window.addEventListener('keydown', handleKeyDown);
    tick();

    return () => {
      canvas.removeEventListener('click', jumpPacket);
      window.removeEventListener('keydown', handleKeyDown);
      window.cancelAnimationFrame(gameAnimationRef.current);
    };
  }, [canHover, isGameOpen, jumpPacket, labels.gameEasterEgg, resetGame, setGameMode]);

  return (
    <section id="about" >
      <div className="about-container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Introduction */}
          <h2>{labels.title}</h2>
          <p>{labels.intro}</p>

          {/* Compétences */}
          <h3>{labels.skillsTitle}</h3>
          <div className="skills">
            {labels.skills.map(([label, tooltip], index) => {
              const Icon = skillIcons[index];

              return (
                <motion.div
                  className="skill"
                  key={label}
                  {...skillMotion}
                >
                  <Icon className="skill-icon" />
                  <span>{label}</span>
                  <span className="tooltip">{tooltip}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Centres d'Intérêt */}
          <h3>{labels.interestsTitle}</h3>
          <div className="interests">
            {labels.interests.map(([label, tooltip], index) => {
              const Icon = interestIcons[index];
              const hasPianoEasterEgg = canHover && index === 0;
              const hasMusicEasterEgg = canHover && index === 1;
              const hasTerminalEasterEgg = canHover && index === 2;
              const hasGameEasterEgg = canHover && index === 3;

              return (
                <motion.button
                  className={`interest ${hasPianoEasterEgg || hasMusicEasterEgg || hasTerminalEasterEgg || hasGameEasterEgg ? 'is-interactive' : ''}`}
                  key={label}
                  type="button"
                  onClick={() => {
                    if (hasPianoEasterEgg) {
                      setIsPianoOpen(true);
                    }

                    if (hasMusicEasterEgg) {
                      setIsMusicOpen(true);
                    }

                    if (hasTerminalEasterEgg) {
                      setIsTerminalOpen(true);
                    }

                    if (hasGameEasterEgg) {
                      setIsGameOpen(true);
                    }
                  }}
                  {...interestMotion}
                >
                  <Icon className="interest-icon" />
                  <span>{label}</span>
                  <span className="tooltip">{tooltip}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Langues */}
          <h3>{labels.languagesTitle}</h3>
          <div className="languages">
            <ul>
              {languages.map((language) => (
                <li key={language.code}>
                  <motion.button
                    className={`language-card ${currentLanguage === language.code ? 'is-active' : ''}`}
                    type="button"
                    aria-pressed={currentLanguage === language.code}
                    onClick={() => onLanguageChange(language.code)}
                    {...skillMotion}
                  >
                    <img src={language.flag} alt={language.alt} className="language-flag" />
                    <span>{labels.languages[language.code][0]}</span>
                    <span className="tooltip">{labels.languages[language.code][1]}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <Modal
        isOpen={isPianoOpen}
        onClose={() => setIsPianoOpen(false)}
        closeLabel={labels.pianoEasterEgg.close}
      >
        <section className="piano-easter-egg" aria-labelledby="piano-easter-egg-title">
          <div className="piano-easter-egg-header">
            <span className="project-modal-label">{labels.pianoEasterEgg.subtitle}</span>
            <h2 id="piano-easter-egg-title">{labels.pianoEasterEgg.title}</h2>
            <p>{labels.pianoEasterEgg.hint}</p>
          </div>
          <div className="piano-stage" aria-label={labels.pianoEasterEgg.subtitle}>
            <div className="piano-lid" aria-hidden="true" />
            <div className="piano-keys">
              {pianoNotes.map((note) => (
                <button
                  className={`piano-key piano-key-${note.type} ${activeNote === note.note ? 'is-active' : ''}`}
                  key={note.note}
                  type="button"
                  onClick={() => playNote(note)}
                  aria-label={`${note.label} ${note.note}`}
                >
                  <span>{note.key}</span>
                  <strong>{note.label}</strong>
                </button>
              ))}
            </div>
          </div>
        </section>
      </Modal>

      <Modal
        isOpen={isMusicOpen}
        onClose={() => {
          setIsMusicOpen(false);
          setIsMusicPlaying(false);
        }}
        closeLabel={labels.musicEasterEgg.close}
      >
        <section className={`music-easter-egg ${isMusicPlaying ? 'is-playing' : ''}`} aria-labelledby="music-easter-egg-title">
          <div className="music-easter-egg-header">
            <span className="project-modal-label">{labels.musicEasterEgg.subtitle}</span>
            <h2 id="music-easter-egg-title">{labels.musicEasterEgg.title}</h2>
            <p>{labels.musicEasterEgg.hint}</p>
          </div>
          <div className="music-stage" aria-hidden="true">
            <div className="vinyl">
              <span className="vinyl-ring vinyl-ring-one" />
              <span className="vinyl-ring vinyl-ring-two" />
              <span className="vinyl-core" />
            </div>
            <div className="equalizer">
              {equalizerBars.map((index) => (
                <span key={index} style={{ '--bar-index': index }} />
              ))}
            </div>
            <div className="floating-notes">
              <span>♪</span>
              <span>♬</span>
              <span>♫</span>
              <span>♩</span>
            </div>
          </div>
          <button className="music-pulse-button" type="button" onClick={playMusicPulse}>
            {labels.musicEasterEgg.action}
          </button>
        </section>
      </Modal>

      <Modal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        closeLabel={labels.terminalEasterEgg.close}
      >
        <section className="terminal-easter-egg" aria-labelledby="terminal-easter-egg-title">
          <div className="terminal-window">
            <div className="terminal-titlebar">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
              <div>
                <span className="project-modal-label">{labels.terminalEasterEgg.subtitle}</span>
                <h2 id="terminal-easter-egg-title">{labels.terminalEasterEgg.title}</h2>
              </div>
            </div>
            <div className="terminal-screen" onClick={() => terminalInputRef.current?.focus()}>
              {terminalLines.map((line, index) => (
                <p className={`terminal-line terminal-line-${line.type}`} key={`${line.type}-${index}`}>
                  {line.text}
                </p>
              ))}
              <form className="terminal-form" onSubmit={runTerminalCommand}>
                <label htmlFor="terminal-command">malo@portfolio:~$</label>
                <input
                  id="terminal-command"
                  ref={terminalInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(event) => setTerminalInput(event.target.value)}
                  placeholder={labels.terminalEasterEgg.placeholder}
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>
        </section>
      </Modal>

      <Modal
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        closeLabel={labels.gameEasterEgg.close}
      >
        <section className="game-easter-egg" aria-labelledby="game-easter-egg-title">
          <div className="game-easter-egg-header">
            <span className="project-modal-label">{labels.gameEasterEgg.subtitle}</span>
            <h2 id="game-easter-egg-title">{labels.gameEasterEgg.title}</h2>
            <p>{labels.gameEasterEgg.hint}</p>
          </div>
          <div className="game-hud">
            <span>{labels.gameEasterEgg.score}: {gameScore}</span>
            <span>{labels.gameEasterEgg.best}: {gameBestScore}</span>
            <span>{gameStatus === 'over' ? labels.gameEasterEgg.gameOver : labels.gameEasterEgg.start}</span>
          </div>
          <canvas
            ref={gameCanvasRef}
            className="packet-runner-canvas"
            width={gameWidth}
            height={gameHeight}
            aria-label={labels.gameEasterEgg.title}
          />
          <button className="game-action-button" type="button" onClick={jumpPacket}>
            {gameStatus === 'over' ? labels.gameEasterEgg.restart : labels.gameEasterEgg.start}
          </button>
        </section>
      </Modal>
    </section>
  );
};

About.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    skillsTitle: PropTypes.string.isRequired,
    interestsTitle: PropTypes.string.isRequired,
    languagesTitle: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    interests: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    pianoEasterEgg: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      hint: PropTypes.string.isRequired,
      close: PropTypes.string.isRequired,
    }).isRequired,
    musicEasterEgg: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      hint: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      close: PropTypes.string.isRequired,
    }).isRequired,
    terminalEasterEgg: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      hint: PropTypes.string.isRequired,
      close: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      welcome: PropTypes.string.isRequired,
      unknown: PropTypes.string.isRequired,
      commands: PropTypes.objectOf(PropTypes.string).isRequired,
    }).isRequired,
    gameEasterEgg: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      hint: PropTypes.string.isRequired,
      close: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      restart: PropTypes.string.isRequired,
      score: PropTypes.string.isRequired,
      best: PropTypes.string.isRequired,
      gameOver: PropTypes.string.isRequired,
    }).isRequired,
    languages: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  }).isRequired,
};

export default About;
