'use client';

import { Track, TRACK_LABELS } from '../types/drill';

interface TrackSelectorProps {
  selected: Track;
  onSelect: (track: Track) => void;
  disabled: boolean;
}

const TRACKS = Object.keys(TRACK_LABELS) as Track[];

export default function TrackSelector({
  selected,
  onSelect,
  disabled,
}: TrackSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {TRACKS.map((track) => {
        const isActive = selected === track;
        return (
          <button
            key={track}
            onClick={() => onSelect(track)}
            disabled={disabled}
            style={
              isActive
                ? {
                    borderColor: 'var(--cyan)',
                    color: 'var(--cyan)',
                    backgroundColor: 'color-mix(in srgb, var(--cyan) 8%, transparent)',
                  }
                : {}
            }
            className={[
              'px-5 py-2 text-xs tracking-[0.25em] uppercase',
              'border transition-all duration-150',
              'disabled:cursor-not-allowed disabled:opacity-40',
              isActive
                ? ''
                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--cyan)] hover:text-[var(--cyan)]',
            ].join(' ')}
          >
            {TRACK_LABELS[track]}
          </button>
        );
      })}
    </div>
  );
}
