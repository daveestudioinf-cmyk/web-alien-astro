import { copy, meta } from './home';
import type { CopyBlock } from './home';

const siteUrl = new URL(meta.canonical).href;
const organizationId = `${siteUrl}#organization`;
const websiteId = `${siteUrl}#website`;
const webpageId = `${siteUrl}#webpage`;

function faqEntities() {
  const entities: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: { '@type': 'Answer'; text: string };
  }> = [];
  let question = '';
  let answer: string[] = [];

  const saveQuestion = () => {
    const text = answer.join('\n').trim();
    if (question && text) {
      entities.push({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text },
      });
    }
  };

  for (const block of copy(10) as CopyBlock[]) {
    if (block.type === 'heading' && block.level === 2) {
      saveQuestion();
      question = block.text?.trim() ?? '';
      answer = [];
      continue;
    }
    if (!question) continue;
    if (block.type === 'paragraph' && block.text?.trim()) {
      answer.push(block.text.trim());
    } else if (block.type === 'list' && block.items?.length) {
      answer.push(block.items.map((item) => `• ${item}`).join('\n'));
    }
  }
  saveQuestion();
  return entities;
}

export const seoSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': organizationId,
      name: 'Alien Creativo',
      url: siteUrl,
      logo: new URL('/assets/images/logo-alien-creativo.svg', siteUrl).href,
      description: meta.description,
      email: 'hola@aliencreativo.com',
      telephone: '+573053552822',
      areaServed: [
        { '@type': 'City', name: 'Medellín' },
        { '@type': 'AdministrativeArea', name: 'Valle de Aburrá' },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hola@aliencreativo.com',
        telephone: '+573053552822',
        availableLanguage: 'Spanish',
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: siteUrl,
      name: 'Alien Creativo',
      inLanguage: 'es-CO',
      publisher: { '@id': organizationId },
    },
    {
      '@type': 'WebPage',
      '@id': webpageId,
      url: siteUrl,
      name: meta.title,
      description: meta.description,
      inLanguage: 'es-CO',
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}#faq`,
      url: `${siteUrl}#faqs`,
      inLanguage: 'es-CO',
      isPartOf: { '@id': webpageId },
      mainEntity: faqEntities(),
    },
  ],
};
