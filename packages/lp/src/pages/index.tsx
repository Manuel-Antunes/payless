import type { HeadFC } from 'gatsby';
import * as React from 'react';

import SEO from '../components/SEO';

const IndexPage = () => {
  return <h1 className='text-primary'>AS</h1>;
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />
