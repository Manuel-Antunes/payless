import { HeadFC } from 'gatsby';
import * as React from 'react';

import SEO from '../components/SEO';

const NotFoundPage = () => {
  return <h1>Oi</h1>;
};

export default NotFoundPage;

export const Head: HeadFC = () => <SEO title='404 - Not Found' />;
