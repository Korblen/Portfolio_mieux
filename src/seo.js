export const siteUrl = 'https://malo.bastianelli.fr/';
export const siteName = 'Portfolio Malo Bastianelli';
export const defaultOgImage = `${siteUrl}og-image.png`;

export const seoByLanguage = {
  fr: {
    lang: 'fr',
    locale: 'fr_FR',
    title: 'Malo Bastianelli | Administrateur systèmes et réseaux',
    description: 'Portfolio de Malo Bastianelli, administrateur systèmes et réseaux. Infrastructure, sécurité, supervision, automatisation, projets techniques et compétences IT.',
    keywords: 'Malo Bastianelli, administrateur systèmes, administrateur réseaux, portfolio informatique, infrastructure, Linux, Windows Server, sécurité, supervision, automatisation, réseau',
  },
  en: {
    lang: 'en',
    locale: 'en_US',
    title: 'Malo Bastianelli | Systems and Network Administrator',
    description: 'Portfolio of Malo Bastianelli, systems and network administrator. Infrastructure, security, monitoring, automation, technical projects and IT skills.',
    keywords: 'Malo Bastianelli, systems administrator, network administrator, IT portfolio, infrastructure, Linux, Windows Server, security, monitoring, automation, networking',
  },
  ja: {
    lang: 'ja',
    locale: 'ja_JP',
    title: 'Malo Bastianelli | システム・ネットワーク管理者',
    description: 'Malo Bastianelli のポートフォリオ。システム・ネットワーク管理、インフラ、セキュリティ、監視、自動化、技術プロジェクトを紹介します。',
    keywords: 'Malo Bastianelli, システム管理者, ネットワーク管理者, ITポートフォリオ, インフラ, Linux, Windows Server, セキュリティ, 監視, 自動化',
  },
  it: {
    lang: 'it',
    locale: 'it_IT',
    title: 'Malo Bastianelli | Amministratore sistemi e reti',
    description: 'Portfolio di Malo Bastianelli, amministratore sistemi e reti. Infrastruttura, sicurezza, monitoraggio, automazione, progetti tecnici e competenze IT.',
    keywords: 'Malo Bastianelli, amministratore sistemi, amministratore reti, portfolio informatico, infrastruttura, Linux, Windows Server, sicurezza, monitoraggio, automazione, reti',
  },
};

const setMeta = (selector, attribute, value) => {
  const element = document.head.querySelector(selector);

  if (element) {
    element.setAttribute(attribute, value);
  }
};

export const updateDocumentSeo = (language) => {
  const seo = seoByLanguage[language] || seoByLanguage.fr;

  document.documentElement.lang = seo.lang;
  document.title = seo.title;

  setMeta('meta[name="description"]', 'content', seo.description);
  setMeta('meta[name="keywords"]', 'content', seo.keywords);
  setMeta('meta[property="og:locale"]', 'content', seo.locale);
  setMeta('meta[property="og:title"]', 'content', seo.title);
  setMeta('meta[property="og:description"]', 'content', seo.description);
  setMeta('meta[name="twitter:title"]', 'content', seo.title);
  setMeta('meta[name="twitter:description"]', 'content', seo.description);
};
