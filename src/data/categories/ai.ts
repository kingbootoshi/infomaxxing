import { Concept } from '@/lib/types';
import { aiPart1 } from './ai-part1';
import { aiPart2 } from './ai-part2';
import { aiPart3 } from './ai-part3';
import { aiPart4 } from './ai-part4';

export const aiConcepts: Concept[] = [
  ...aiPart1,
  ...aiPart2,
  ...aiPart3,
  ...aiPart4,
];
