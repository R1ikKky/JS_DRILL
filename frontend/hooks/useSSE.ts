'use client';

import { useRef, useCallback } from 'react';

export interface SseData {
  token?: string;
  done?: boolean;
  error?: boolean;
  message?: string;
}

interface StreamCallbacks {
  onToken: (token: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

export function useSSE() {
  const abortRef = useRef<AbortController | null>(null);

  const startStream = useCallback(
    async (
      url: string,
      options: RequestInit,
      callbacks: StreamCallbacks,
    ): Promise<void> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) {
          callbacks.onError(
            `HTTP ${response.status}: ${response.statusText}`,
          );
          return;
        }

        if (!response.body) {
          callbacks.onError('Response body is empty');
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;

            const jsonStr = trimmed.slice(5).trim();
            if (!jsonStr) continue;

            try {
              const data = JSON.parse(jsonStr) as SseData;

              if (data.error) {
                callbacks.onError(data.message ?? 'Stream error');
                return;
              }
              if (data.done) {
                callbacks.onDone();
                return;
              }
              if (data.token) {
                callbacks.onToken(data.token);
              }
            } catch {
              // Skip malformed events
            }
          }
        }
      } catch (e: unknown) {
        if (e instanceof Error && e.name !== 'AbortError') {
          callbacks.onError(e.message);
        }
      }
    },
    [],
  );

  const cancel = useCallback((): void => {
    abortRef.current?.abort();
  }, []);

  return { startStream, cancel };
}
