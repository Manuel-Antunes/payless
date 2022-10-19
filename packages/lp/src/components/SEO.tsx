import React from 'react';

import { useSiteMetadata } from '../hooks/useSiteMetadata';

export interface SEOProps {
  description?: string;
  lang?: string;
  meta?: Meta[];
  title?: string;
  pathname?: string;
  children?: React.ReactNode;
}

interface Meta {
  property?: string;
  name?: string;
  content: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  pathname,
  children,
  meta = [],
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    keywords,
    author,
  } = useSiteMetadata();
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    author,
  };
  return (
    <>
      <title>{seo.title}</title>
      <meta name='description' content={seo.description} />
      <meta name='image' content={seo.image} />
      <meta name='og:card' content='summary_large_image' />
      <meta name='og:title' content={seo.title} />
      <meta name='og:url' content={seo.url} />
      <meta name='og:description' content={seo.description} />
      <meta name='og:image' content={seo.image} />
      <meta name='og:creator' content={seo.author} />
      {/* meta keywords */}
      <meta name='keywords' content={keywords.join(', ')} />
      <link rel='icon' href='/icon.png' />
      {children}
      {meta.map(m => (
        <meta key={m.property} {...m} />
      ))}
    </>
  );
};

export default SEO;
