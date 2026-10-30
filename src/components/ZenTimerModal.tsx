import React, { useState, useEffect } from 'react';
import { useStudy } from '../context/StudyContext';
import { Play, Pause, RotateCcw, X, Sparkles, Compass } from 'lucide-react';

export const ZenTimerModal: React.FC = () => {
  const { showZenTimer, setShowZenTimer } = useStudy();

  const [durationMinutes, setDurationMinutes] = useState<number>(50);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(50 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining]);

  if (!showZenTimer) return null;

  const handleSelectPreset = (mins: number) => {
    setIsRunning(false);
    setDurationMinutes(mins);
    setSecondsRemaining(mins * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(durationMinutes * 60);
  };

  const formatClock = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((durationMinutes * 60 - secondsRemaining) / (durationMinutes * 60)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-lg p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setShowZenTimer(false)}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Ambient Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Compass className="w-4 h-4" />
            <span>Zen Focus Space</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Distraction-Free Study Session
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Deep focus block for Laxmikanth, NCERT, or Answer Writing practice.
          </p>
        </div>

        {/* Circular Ambient Clock */}
        <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-slate-100 dark:text-slate-800"
              strokeWidth="5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-indigo-600 dark:text-indigo-400 transition-all duration-1000 ease-linear"
              strokeWidth="5"
              strokeDasharray={276.4}
              strokeDashoffset={276.4 - (276.4 * progress) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-100 tabular-nums">
              {formatClock(secondsRemaining)}
            </div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-1">
              {isRunning ? 'Focus In Progress' : 'Paused / Ready'}
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center justify-center gap-2">
          {[
            { label: '25m Pomodoro', mins: 25 },
            { label: '50m Deep Block', mins: 50 },
            { label: '120m Prelims Paper', mins: 120 },
          ].map((preset) => (
            <button
              key={preset.mins}
              onClick={() => handleSelectPreset(preset.mins)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                durationMinutes === preset.mins
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause Timer' : 'Begin Focus'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Quiet Zen Advice */}
        <div className="pt-2 text-xs italic text-slate-400">
          "One single-pointed mind accomplishes what ten scattered minds cannot."
        </div>
      </div>
    </div>
  );
};
