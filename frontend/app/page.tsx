'use client';

import { useState } from 'react';
import { useDrill } from '../hooks/useDrill';
import { useTheme } from '../lib/ThemeContext';
import TrackSelector from '../components/TrackSelector';
import TopicSelector from '../components/TopicSelector';
import DifficultySelector from '../components/DifficultySelector';
import ModeToggle from '../components/ModeToggle';
import QuestionPanel from '../components/QuestionPanel';
import AnswerInput from '../components/AnswerInput';
import FeedbackPanel from '../components/FeedbackPanel';
import ScoreBar from '../components/ScoreBar';
import ThemePickerModal from '../components/ThemePickerModal';
import { TRACK_TOPICS, THEORY_TOPICS, TOPIC_LABELS, TRACK_LABELS, DIFFICULTY_LABELS } from '../types/drill';

export default function Home() {
  const [themeOpen, setThemeOpen] = useState(false);
  const { themeId } = useTheme();
  const {
    state,
    setTrack,
    setMode,
    setTopic,
    setDifficulty,
    setAnswer,
    fireQuestion,
    submitAnswer,
    skipQuestion,
  } = useDrill();

  const { phase, track, mode, topic, difficulty, question, answer, feedback, verdict, score } =
    state;

  const isIdle = phase === 'idle';
  const isStreaming = phase === 'loading-question' || phase === 'evaluating';
  const hasInteracted =
    score.correct + score.wrong + score.skipped > 0 ||
    phase !== 'idle' ||
    question !== '';

  const topicsForTrack = TRACK_TOPICS[track];
  const supportsTheory = topic != null && THEORY_TOPICS.has(topic);

  return (
    <main className="min-h-screen relative z-10">
      <ThemePickerModal open={themeOpen} onClose={() => setThemeOpen(false)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Header ─────────────────────────────────────────── */}
        <header className="mb-10 pb-6 border-b border-[var(--border)]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-[0.3em] uppercase font-sans"
                  style={{ color: 'var(--cyan)' }}>
                JS DRILL
              </h1>
              <p className="text-[10px] tracking-[0.25em] uppercase mt-1"
                 style={{ color: 'var(--muted)' }}>
                Live Coding Interview Simulator
              </p>
            </div>
            <div className="flex items-center gap-4">
              {hasInteracted && <ScoreBar score={score} />}
              <button
                onClick={() => setThemeOpen(true)}
                className="text-[10px] tracking-[0.2em] uppercase border px-3 py-1.5 transition-all duration-150"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--cyan)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--cyan)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                }}
              >
                {themeId}
              </button>
            </div>
          </div>
        </header>

        {/* ── Selectors — visible only in idle phase ──────────── */}
        {isIdle && (
          <>
            <section className="mb-6">
              <label className="block text-[10px] tracking-[0.25em] uppercase mb-3"
                     style={{ color: 'var(--muted)' }}>
                TRACK
              </label>
              <TrackSelector
                selected={track}
                onSelect={setTrack}
                disabled={false}
              />
            </section>

            <section className="mb-6">
              <label className="block text-[10px] tracking-[0.25em] uppercase mb-3"
                     style={{ color: 'var(--muted)' }}>
                TOPIC
              </label>
              <TopicSelector
                topics={topicsForTrack}
                selected={topic}
                onSelect={setTopic}
                disabled={false}
              />
            </section>

            <section className="mb-6">
              <label className="block text-[10px] tracking-[0.25em] uppercase mb-3"
                     style={{ color: 'var(--muted)' }}>
                DIFFICULTY
              </label>
              <DifficultySelector
                selected={difficulty}
                onSelect={setDifficulty}
                disabled={false}
              />
            </section>

            {supportsTheory && (
              <section className="mb-6">
                <label className="block text-[10px] tracking-[0.25em] uppercase mb-3"
                       style={{ color: 'var(--muted)' }}>
                  MODE
                </label>
                <ModeToggle
                  selected={mode}
                  onSelect={setMode}
                  disabled={false}
                />
              </section>
            )}

            <div className="mb-8">
              <button
                onClick={() => void fireQuestion()}
                disabled={!topic}
                className={[
                  'px-8 py-3 text-sm tracking-[0.25em] uppercase border',
                  'transition-all duration-150',
                  'disabled:opacity-30 disabled:cursor-not-allowed',
                ].join(' ')}
                style={
                  topic
                    ? { borderColor: 'var(--cyan)', color: 'var(--cyan)' }
                    : { borderColor: 'var(--muted)', color: 'var(--muted)' }
                }
                onMouseEnter={(e) => {
                  if (!topic) return;
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--cyan)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--bg)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = topic ? 'var(--cyan)' : 'var(--muted)';
                }}
              >
                FIRE QUESTION
              </button>
            </div>
          </>
        )}

        {/* ── Active session summary bar (non-idle) ───────────── */}
        {!isIdle && topic && (
          <div className="mb-6 flex items-center gap-3 flex-wrap text-[10px] tracking-[0.2em] uppercase"
               style={{ color: 'var(--muted)' }}>
            <span style={{ color: 'var(--cyan)' }}>{TRACK_LABELS[track]}</span>
            <span>›</span>
            <span>{TOPIC_LABELS[topic]}</span>
            <span>›</span>
            <span>{DIFFICULTY_LABELS[difficulty]}</span>
            {supportsTheory && (
              <>
                <span>›</span>
                <span style={{ color: mode === 'theory' ? 'var(--amber)' : 'var(--cyan)' }}>
                  {mode.toUpperCase()}
                </span>
              </>
            )}
          </div>
        )}

        {/* ── Loading indicator ───────────────────────────────── */}
        {phase === 'loading-question' && (
          <div className="mb-4 text-xs tracking-[0.25em] uppercase"
               style={{ color: 'var(--cyan)' }}>
            <span className="loading-dots">GENERATING</span>
          </div>
        )}

        {/* ── Question Panel ──────────────────────────────────── */}
        {(phase !== 'idle' || question !== '') && (
          <QuestionPanel
            question={question}
            isStreaming={phase === 'loading-question'}
            className="mb-6"
          />
        )}

        {/* ── Answer area ─────────────────────────────────────── */}
        {(phase === 'answering' ||
          phase === 'evaluating' ||
          phase === 'feedback') && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] tracking-[0.25em] uppercase"
                     style={{ color: 'var(--muted)' }}>
                YOUR ANSWER
              </label>
              {phase === 'answering' && (
                <span className="text-[10px]" style={{ color: 'var(--muted)' }}>
                  Ctrl+Enter to submit
                </span>
              )}
            </div>

            <AnswerInput
              value={answer}
              onChange={setAnswer}
              onSubmit={() => void submitAnswer()}
              disabled={phase !== 'answering'}
              mode={mode}
            />

            {phase === 'answering' && (
              <div className="mt-3 flex gap-3 flex-wrap">
                <button
                  onClick={() => void submitAnswer()}
                  disabled={!answer.trim()}
                  className="px-6 py-3 text-sm tracking-[0.25em] uppercase border transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ borderColor: 'var(--amber)', color: 'var(--amber)' }}
                  onMouseEnter={(e) => {
                    if (!answer.trim()) return;
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--amber)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--bg)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--amber)';
                  }}
                >
                  SUBMIT ANSWER
                </button>

                <button
                  onClick={skipQuestion}
                  className="px-6 py-3 text-sm tracking-[0.25em] uppercase border transition-all duration-150"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--red)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--red)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                  }}
                >
                  SKIP
                </button>

                <button
                  onClick={skipQuestion}
                  className="px-6 py-3 text-sm tracking-[0.25em] uppercase border transition-all duration-150"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--muted)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
                  }}
                >
                  CHANGE TOPIC
                </button>
              </div>
            )}
          </section>
        )}

        {/* ── Evaluating indicator ────────────────────────────── */}
        {phase === 'evaluating' && (
          <div className="mb-4 text-xs tracking-[0.25em] uppercase"
               style={{ color: 'var(--amber)' }}>
            <span className="loading-dots">ANALYSING</span>
          </div>
        )}

        {/* ── Feedback Panel ──────────────────────────────────── */}
        {(phase === 'evaluating' || phase === 'feedback') && feedback && (
          <FeedbackPanel
            feedback={feedback}
            verdict={verdict}
            isStreaming={phase === 'evaluating'}
            className="mb-8"
          />
        )}

        {/* ── Post-feedback actions ────────────────────────────── */}
        {phase === 'feedback' && (
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => void fireQuestion()}
              disabled={!topic}
              className="px-8 py-3 text-sm tracking-[0.25em] uppercase border transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
              onMouseEnter={(e) => {
                if (!topic) return;
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--cyan)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--bg)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--cyan)';
              }}
            >
              NEXT QUESTION
            </button>

            <button
              onClick={skipQuestion}
              className="px-6 py-3 text-sm tracking-[0.25em] uppercase border transition-all duration-150"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--muted)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              }}
            >
              CHANGE TOPIC
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
