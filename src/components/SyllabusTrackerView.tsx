import React, { useState } from 'react';
import { UPSC_SYLLABUS_TOPICS, SyllabusTopic } from '../data/syllabusData';
import { CheckSquare, Square, BookOpen, Layers, Award, Sparkles } from 'lucide-react';

export const SyllabusTrackerView: React.FC = () => {
  const [topics, setTopics] = useState<SyllabusTopic[]>(() => {
    try {
      const saved = localStorage.getItem('zen_upsc_syllabus_state');
      return saved ? JSON.parse(saved) : UPSC_SYLLABUS_TOPICS;
    } catch {
      return UPSC_SYLLABUS_TOPICS;
    }
  });

  const [activePaper, setActivePaper] = useState<string>('all');

  const toggleTopic = (id: string) => {
    setTopics((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      localStorage.setItem('zen_upsc_syllabus_state', JSON.stringify(updated));
      return updated;
    });
  };

  const completedCount = topics.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  const filteredTopics = activePaper === 'all'
    ? topics
    : topics.filter((t) => t.paper.toLowerCase().includes(activePaper.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header & Overall Syllabus Progress */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <span>UPSC CSE Official Syllabus</span>
            <span aria-hidden="true">·</span>
            <span>Micro-Topic Coverage</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Prelims & Mains General Studies Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Track micro-theme readiness across Polity, History, Geography, Economy, Environment, and Science.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 min-w-[220px]">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Syllabus Covered</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-1 text-[11px] text-slate-500 text-right font-mono">
            {completedCount} of {topics.length} Modules Mastered
          </div>
        </div>
      </div>

      {/* Paper Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setActivePaper('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activePaper === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          All GS Papers
        </button>
        <button
          onClick={() => setActivePaper('Prelims GS-1')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activePaper === 'Prelims GS-1'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Prelims Paper-1
        </button>
      </div>

      {/* Syllabus Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className={`p-5 rounded-2xl border transition-colors shadow-xs ${
              topic.completed
                ? 'bg-white dark:bg-slate-900 border-emerald-300/80 dark:border-emerald-900/60'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {topic.paper}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-600 dark:text-slate-300">{topic.weightage}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {topic.title}
                </h3>
              </div>

              <button
                onClick={() => toggleTopic(topic.id)}
                className="p-1 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer shrink-0"
                title={topic.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
              >
                {topic.completed ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Subtopics Checklist */}
            <div className="pt-3 space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Core Subtopics:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {topic.subtopics.map((sub, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span className="leading-relaxed">{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
