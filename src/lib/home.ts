import source from '../data/home.json';

export interface CopyBlock {
  type: string;
  text?: string;
  level?: number;
  role?: string;
  items?: string[];
  url?: string;
}
export interface CopyGroup { title: string; blocks: CopyBlock[]; }
const sections = source.sections as Record<string, { label: string; blocks: CopyBlock[] }>;
export const meta = source.meta;
export function copy(number: number) { return sections[String(number)].blocks; }
export function groups(blocks: CopyBlock[], level: number) {
  const intro: CopyBlock[] = [];
  const groups: CopyGroup[] = [];
  for (const block of blocks) {
    if (block.type === 'heading' && block.level === level) groups.push({title: block.text!, blocks: []});
    else if (groups.length) groups[groups.length - 1].blocks.push(block);
    else intro.push(block);
  }
  return {intro, groups};
}
export function cta(blocks: CopyBlock[], role = 'CTA') {
  return blocks.find(block => block.type === 'cta' && block.role === role)?.text;
}
