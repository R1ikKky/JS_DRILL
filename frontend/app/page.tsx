'use client';

import { useState } from 'react';
import { useDrill } from '../hooks/useDrill';
import TopicSelector from '../components/TopicSelector';
import DifficultySelector from '../components/DifficultySelector';
import QuestionPanel from '../components/QuestionPanel';
import AnswerInput from '../components/AnswerInput';
import FeedbackPanel from '../components/FeedbackPanel';
import ScoreBar from '../components/ScoreBar';
import { ThemePickerButton } from '../components/ThemePickerButton';
import ThemePickerModal from '../components/ThemePickerModal';

export default function Home() {
  const {
    state,
    setTopic,
    setDifficulty,
    setAnswer,
    fireQuestion,
    submitAnswer,
    skipQuestion,
  } = useDrill();

  const [themePicker, setThemePicker] = useState(false);

  const { phase, topic, difficulty, question, answer, feedback, verdict, score } =
    state;

  const isStreaming = phase === 'loading-question' || phase === 'evaluating';
  const hasInteracted =
    score.correct + score.wrong + score.skipped > 0 ||
    phase !== 'idle' ||
    question !== '';

  return (
    <>
      <ThemePickerModal open={themePicker} onClose={() => setThemePicker(false)} />

      <main className="min-h-screen relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

          {/* ── Header ──────────────────────────────────────────── */}
          <header
            className="mb-10 pb-6"
            style={{ borderBottom: 'var(--border-width) solid var(--border)' }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1
                  className="text-3xl font-bold tracking-[0.3em] uppercase"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-head)' }}
                >
                  JS DRILL
                </h1>
                <p
                  className="text-[10px] tracking-[0.25em] uppercase mt-1"
                  style={{ color: 'var(--muted)' }}
                >
                  Live Coding Interview Simulator
                </p>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                {hasInteracted && <ScoreBar score={score} />}
                <ThemePickerButton onClick={() => setThemePicker(true)} />
              </div>
            </div>
          </header>

          {/* ── Topic Selector ─────────────────────────────────── */}
          <section className="mb-6">
            <label
              className="block text-[10px] tracking-[0.25em] uppercase mb-3"
              style={{ color: 'var(--muted)' }}
            >
              TOPIC
            </label>
            <TopicSelector
              selected={topic}
              onSelect={setTopic}
              disabled={isStreaming}
            />
          </section>

          {/* ── Difficulty Selector ────────────────────────────── */}
          <section className="mb-8">
            <label
              className="block text-[10px] tracking-[0.25em] uppercase mb-3"
              style={{ color: 'var(--muted)' }}
            >
              DIFFICULTY
            </label>
            <DifficultySelector
              selected={difficulty}
              onSelect={setDifficulty}
              disabled={isStreaming}
            />
          </section>

          {/* ── Fire / Generate button ─────────────────────────── */}
          {phase === 'idle' && (
            <div className="mb-8">
              <button
                onClick={() => void fireQuestion()}
                disabled={!topic}
                className="btn-fire px-8 py-3 text-sm tracking-[0.25em] uppercase transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  border: `var(--border-width) solid ${topic ? 'var(--accent)' : 'var(--muted)'}`,
                  color: topic ? 'var(--accent)' : 'var(--muted)',
                  background: 'transparent',
                  borderRadius: 'var(--btn-radius)',
                  fontFamily: 'var(--font-body)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: topic ? 'pointer' : 'not-allowed',
                }}
                onMouseEnter={(e) => {
                  if (!topic) return;
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.backgroundColor = 'var(--accent)';
                  el.style.color = 'var(--bg)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.backgroundColor = 'transparent';
                  el.style.color = topic ? 'var(--accent)' : 'var(--muted)';
                }}
              >
                FIRE QUESTION
              </button>
            </div>
          )}

          {/* ── Loading indicator ──────────────────────────────── */}
          {phase === 'loading-question' && (
            <div
              className="mb-4 text-xs tracking-[0.25em] uppercase"
              style={{ color: 'var(--accent)' }}
            >
              <span className="loading-dots">GENERATING</span>
            </div>
          )}

          {/* ── Question Panel ─────────────────────────────────── */}
          {(phase !== 'idle' || question !== '') && (
            <QuestionPanel
              question={question}
              isStreaming={phase === 'loading-question'}
              className="mb-6"
            />
          )}

          {/* ── Answer area ────────────────────────────────────── */}
          {(phase === 'answering' ||
            phase === 'evaluating' ||
            phase === 'feedback') && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label
                  className="text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: 'var(--muted)' }}
                >
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
              />

              {phase === 'answering' && (
                <div className="mt-3 flex gap-3 flex-wrap">
                  <button
                    onClick={() => void submitAnswer()}
                    disabled={!answer.trim()}
                    className="btn-submit px-6 py-3 text-sm tracking-[0.25em] uppercase transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      border: `var(--border-width) solid var(--accent2)`,
                      color: 'var(--accent2)',
                      background: 'transparent',
                      borderRadius: 'var(--btn-radius)',
                      fontFamily: 'var(--font-body)',
                      cursor: answer.trim() ? 'pointer' : 'not-allowed',
                    }}
                    onMouseEnter={(e) => {
                      if (!answer.trim()) return;
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.backgroundColor = 'var(--accent2)';
                      el.style.color = 'var(--bg)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.backgroundColor = 'transparent';
                      el.style.color = 'var(--accent2)';
                    }}
                  >
                    SUBMIT ANSWER
                  </button>

                  <button
                    onClick={skipQuestion}
                    className="px-6 py-3 text-sm tracking-[0.25em] uppercase transition-all duration-150"
                    style={{
                      border: `var(--border-width) solid var(--border)`,
                      color: 'var(--muted)',
                      background: 'transparent',
                      borderRadius: 'var(--btn-radius)',
                      fontFamily: 'var(--font-body)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.borderColor = 'var(--negative)';
                      el.style.color = 'var(--negative)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.borderColor = 'var(--border)';
                      el.style.color = 'var(--muted)';
                    }}
                  >
                    SKIP
                  </button>
                </div>
              )}
            </section>
          )}

          {/* ── Evaluating indicator ───────────────────────────── */}
          {phase === 'evaluating' && (
            <div
              className="mb-4 text-xs tracking-[0.25em] uppercase"
              style={{ color: 'var(--accent2)' }}
            >
              <span className="loading-dots">ANALYSING</span>
            </div>
          )}

          {/* ── Feedback Panel ─────────────────────────────────── */}
          {(phase === 'evaluating' || phase === 'feedback') && feedback && (
            <FeedbackPanel
              feedback={feedback}
              verdict={verdict}
              isStreaming={phase === 'evaluating'}
              className="mb-8"
            />
          )}

          {/* ── Next question button ───────────────────────────── */}
          {phase === 'feedback' && (
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => void fireQuestion()}
                disabled={!topic}
                className="btn-fire px-8 py-3 text-sm tracking-[0.25em] uppercase transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  border: `var(--border-width) solid var(--accent)`,
                  color: 'var(--accent)',
                  background: 'transparent',
                  borderRadius: 'var(--btn-radius)',
                  fontFamily: 'var(--font-body)',
                  cursor: topic ? 'pointer' : 'not-allowed',
                }}
                onMouseEnter={(e) => {
                  if (!topic) return;
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.backgroundColor = 'var(--accent)';
                  el.style.color = 'var(--bg)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.backgroundColor = 'transparent';
                  el.style.color = 'var(--accent)';
                }}
              >
                NEXT QUESTION
              </button>

              <button
                onClick={skipQuestion}
                className="px-6 py-3 text-sm tracking-[0.25em] uppercase transition-all duration-150"
                style={{
                  border: `var(--border-width) solid var(--border)`,
                  color: 'var(--muted)',
                  background: 'transparent',
                  borderRadius: 'var(--btn-radius)',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                }}
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
    </>
  );
}
