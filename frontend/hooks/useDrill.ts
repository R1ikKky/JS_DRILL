'use client';

import { useReducer, useCallback, useRef } from 'react';
import { DrillState, Topic, Track, Mode, Difficulty, Verdict } from '../types/drill';
import { buildQuestionUrl, buildEvaluateUrl } from '../lib/api';
import { useSSE } from './useSSE';

type DrillAction =
  | { type: 'SET_TRACK'; track: Track }
  | { type: 'SET_MODE'; mode: Mode }
  | { type: 'SET_TOPIC'; topic: Topic }
  | { type: 'SET_DIFFICULTY'; difficulty: Difficulty }
  | { type: 'START_QUESTION' }
  | { type: 'APPEND_QUESTION_TOKEN'; token: string }
  | { type: 'QUESTION_DONE' }
  | { type: 'SET_ANSWER'; answer: string }
  | { type: 'START_EVALUATION' }
  | { type: 'APPEND_FEEDBACK_TOKEN'; token: string }
  | { type: 'FEEDBACK_DONE' }
  | { type: 'SKIP_QUESTION' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'STREAM_ERROR' };

const initialState: DrillState = {
  phase: 'idle',
  track: 'js',
  mode: 'drill',
  topic: null,
  difficulty: 'medium',
  question: '',
  answer: '',
  feedback: '',
  verdict: null,
  score: { correct: 0, wrong: 0, skipped: 0 },
};

function extractVerdict(text: string): Verdict {
  const firstLine = text.split('\n')[0].trim();
  if (firstLine === 'ВЕРНО') return 'ВЕРНО';
  if (firstLine === 'ЧАСТИЧНО') return 'ЧАСТИЧНО';
  if (firstLine === 'НЕВЕРНО') return 'НЕВЕРНО';
  return null;
}

function drillReducer(state: DrillState, action: DrillAction): DrillState {
  switch (action.type) {
    case 'SET_TRACK':
      return {
        ...state,
        track: action.track,
        mode: 'drill',
        topic: null,
        question: '',
        answer: '',
        feedback: '',
        verdict: null,
        phase: 'idle',
      };

    case 'SET_MODE':
      return { ...state, mode: action.mode };

    case 'SET_TOPIC':
      return {
        ...state,
        topic: action.topic,
        phase: 'idle',
        question: '',
        answer: '',
        feedback: '',
        verdict: null,
      };

    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.difficulty };

    case 'START_QUESTION':
      return {
        ...state,
        phase: 'loading-question',
        question: '',
        answer: '',
        feedback: '',
        verdict: null,
      };

    case 'APPEND_QUESTION_TOKEN':
      return { ...state, question: state.question + action.token };

    case 'QUESTION_DONE':
      return { ...state, phase: 'answering' };

    case 'SET_ANSWER':
      return { ...state, answer: action.answer };

    case 'START_EVALUATION':
      return {
        ...state,
        phase: 'evaluating',
        feedback: '',
        verdict: null,
      };

    case 'APPEND_FEEDBACK_TOKEN': {
      const newFeedback = state.feedback + action.token;
      const verdict: Verdict = state.verdict ?? extractVerdict(newFeedback);
      return { ...state, feedback: newFeedback, verdict };
    }

    case 'FEEDBACK_DONE': {
      const score = { ...state.score };
      if (state.verdict === 'ВЕРНО') {
        score.correct += 1;
      } else if (
        state.verdict === 'НЕВЕРНО' ||
        state.verdict === 'ЧАСТИЧНО'
      ) {
        score.wrong += 1;
      }
      return { ...state, phase: 'feedback', score };
    }

    case 'SKIP_QUESTION':
      return {
        ...state,
        phase: 'idle',
        question: '',
        answer: '',
        feedback: '',
        verdict: null,
        score: { ...state.score, skipped: state.score.skipped + 1 },
      };

    case 'NEXT_QUESTION':
      return {
        ...state,
        phase: 'idle',
        question: '',
        answer: '',
        feedback: '',
        verdict: null,
      };

    case 'STREAM_ERROR':
      return { ...state, phase: 'idle' };

    default:
      return state;
  }
}

export function useDrill() {
  const [state, dispatch] = useReducer(drillReducer, initialState);
  const { startStream, cancel } = useSSE();

  // Keep a ref so async callbacks always read latest state
  const stateRef = useRef(state);
  stateRef.current = state;

  const fireQuestion = useCallback(async (): Promise<void> => {
    const { track, topic, difficulty, mode } = stateRef.current;
    if (!topic) return;

    cancel();
    dispatch({ type: 'START_QUESTION' });

    await startStream(
      buildQuestionUrl(track, topic, difficulty, mode),
      {
        method: 'GET',
        headers: { Accept: 'text/event-stream' },
      },
      {
        onToken: (token) =>
          dispatch({ type: 'APPEND_QUESTION_TOKEN', token }),
        onDone: () => dispatch({ type: 'QUESTION_DONE' }),
        onError: () => dispatch({ type: 'STREAM_ERROR' }),
      },
    );
  }, [startStream, cancel]);

  const submitAnswer = useCallback(async (): Promise<void> => {
    const { track, topic, difficulty, mode, question, answer } = stateRef.current;
    if (!topic || !answer.trim()) return;

    cancel();
    dispatch({ type: 'START_EVALUATION' });

    await startStream(
      buildEvaluateUrl(),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({ track, topic, difficulty, mode, question, answer }),
      },
      {
        onToken: (token) =>
          dispatch({ type: 'APPEND_FEEDBACK_TOKEN', token }),
        onDone: () => dispatch({ type: 'FEEDBACK_DONE' }),
        onError: () => dispatch({ type: 'STREAM_ERROR' }),
      },
    );
  }, [startStream, cancel]);

  const skipQuestion = useCallback((): void => {
    cancel();
    dispatch({ type: 'SKIP_QUESTION' });
  }, [cancel]);

  const nextQuestion = useCallback((): void => {
    cancel();
    dispatch({ type: 'NEXT_QUESTION' });
  }, [cancel]);

  const setTrack = useCallback((track: Track): void => {
    dispatch({ type: 'SET_TRACK', track });
  }, []);

  const setMode = useCallback((mode: Mode): void => {
    dispatch({ type: 'SET_MODE', mode });
  }, []);

  const setTopic = useCallback((topic: Topic): void => {
    dispatch({ type: 'SET_TOPIC', topic });
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty): void => {
    dispatch({ type: 'SET_DIFFICULTY', difficulty });
  }, []);

  const setAnswer = useCallback((answer: string): void => {
    dispatch({ type: 'SET_ANSWER', answer });
  }, []);

  return {
    state,
    setTrack,
    setMode,
    setTopic,
    setDifficulty,
    setAnswer,
    fireQuestion,
    submitAnswer,
    skipQuestion,
    nextQuestion,
  };
}
