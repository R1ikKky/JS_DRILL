import OpenAI from 'openai';

export const DEEPSEEK_CLIENT = 'DEEPSEEK_CLIENT';

export const createDeepSeekClient = (apiKey: string): OpenAI =>
  new OpenAI({
    apiKey,
    baseURL: 'https://api.deepseek.com/v1',
  });
