'use client';

import { Topic, TOPIC_LABELS } from '../types/drill';

interface TopicSelectorProps {
  topics: Topic[];
  selected: Topic | null;
  onSelect: (topic: Topic) => void;
  disabled: boolean;
}

export default function TopicSelector({
  topics,
  selected,
  onSelect,
  disabled,
}: TopicSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {topics.map((topic) => {
        const isActive = selected === topic;
        return (
          <button
            key={topic}
            onClick={() => onSelect(topic)}
            disabled={disabled}
            className={[
              'px-4 py-3 text-xs tracking-[0.15em] uppercase text-left',
              'border transition-all duration-150',
              'disabled:cursor-not-allowed disabled:opacity-40',
              isActive
                ? 'border-[var(--cyan)] text-[var(--cyan)] bg-[rgba(0,212,255,0.07)]'
                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--cyan)] hover:text-[var(--cyan)]',
            ].join(' ')}
          >
            <span className="block text-[10px] text-[var(--muted)] mb-1 tracking-[0.2em]">
              {topic.toUpperCase()}
            </span>
            {TOPIC_LABELS[topic]}
          </button>
        );
      })}
    </div>
  );
}
