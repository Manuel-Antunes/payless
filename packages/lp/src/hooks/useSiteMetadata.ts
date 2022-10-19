/* eslint-disable relay/graphql-syntax */
import { graphql, useStaticQuery } from 'gatsby';

export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  keywords: string[];
  author: string;
  image: string;
  social: {
    name: string;
    url: string;
  }[];
}

export const useSiteMetadata = () => {
  const data = useStaticQuery<{
    site: { siteMetadata: SiteMetadata };
  }>(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          keywords
          description
          author
          image
          social {
            name
            url
          }
        }
      }
    }
  `);
  return data.site.siteMetadata;
};
