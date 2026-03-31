'use client';

import { Topic, TOPIC_LABELS } from '../types/drill';

interface TopicSelectorProps {
  selected: Topic | null;
  onSelect: (topic: Topic) => void;
  disabled: boolean;
}

const TOPICS = Object.keys(TOPIC_LABELS) as Topic[];

export default function TopicSelector({
  selected,
  onSelect,
  disabled,
}: TopicSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {TOPICS.map((topic) => {
        const isActive = selected === topic;
        return (
          <button
            key={topic}
            onClick={() => onSelect(topic)}
            disabled={disabled}
            className={`topic-btn${isActive ? ' active' : ''}`}
            style={{
              padding: '12px 16px',
              textAlign: 'left',
              border: `var(--border-width) solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-sm)',
              background: isActive
                ? 'color-mix(in srgb, var(--accent) 8%, transparent)'
                : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.4 : 1,
              transition: 'all 0.15s',
              boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '10px',
                color: 'var(--muted)',
                marginBottom: '4px',
                letterSpacing: '0.2em',
              }}
            >
              {topic.toUpperCase()}
            </span>
            {TOPIC_LABELS[topic]}
          </button>
        );
      })}
    </div>
  );
}
