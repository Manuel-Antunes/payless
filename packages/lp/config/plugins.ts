const plugins = [
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sitemap`,
  {
    resolve: `gatsby-plugin-nprogress`,
    options: {
      color: `#D9D9D9`,
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      // The property ID; the tracking code won't be generated without it
      trackingId: 'G-07CMPCPBCW',
      // Defines where to place the tracking script - `true` in the head and `false` in the body
      head: false,
      // Setting this parameter is optional
      anonymize: true,
      // Setting this parameter is also optional
      respectDNT: true,
      // Avoids sending pageview hits from custom paths
      exclude: ['/preview/**', '/do-not-track/me/too/'],
      // Delays sending pageview hits on route update (in milliseconds)
      pageTransitionDelay: 0,
      // Enables Google Optimize using your container Id
      optimizeId: 'YOUR_GOOGLE_OPTIMIZE_TRACKING_ID',
      // Enables Google Optimize Experiment ID
      experimentId: 'YOUR_GOOGLE_EXPERIMENT_ID',
      // Set Variation ID. 0 for original 1,2,3....
      variationId: 'YOUR_GOOGLE_OPTIMIZE_VARIATION_ID',
      // Defers execution of google analytics script after page load
      defer: false,
      // Any additional optional fields
      sampleRate: 5,
      siteSpeedSampleRate: 10,
      cookieDomain: 'manuelantun.es',
      // defaults to false
      enableWebVitalsTracking: true,
    },
  },
  {
    resolve: `gatsby-plugin-webfonts`,
    options: {
      fonts: {
        google: [
          {
            family: 'Poppins',
            variants: ['100', '200', '250', '300', '500', '700'],
          },
        ],
      },
    },
  },
  {
    resolve: `gatsby-plugin-canonical-urls`,
    options: {
      siteUrl: `https://manuelantun.es`,
    },
  },
  {
    resolve: 'gatsby-plugin-firebase-v9.0',
    options: {
      credentials: {
        apiKey: 'AIzaSyAwkmrpHpS5FZ0_CkVbsnd2UEJLbMUdy70',
        authDomain: 'pagina-manuel-antunes.firebaseapp.com',
        projectId: 'pagina-manuel-antunes',
        storageBucket: 'pagina-manuel-antunes.appspot.com',
        messagingSenderId: '787590782623',
        appId: '1:787590782623:web:a67b6d6b8707dcef1cccaa',
        measurementId: 'G-07CMPCPBCW',
        databaseURL:
          'https://pagina-manuel-antunes-default-rtdb.firebaseio.com',
      },
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Manuel Antunes`,
      short_name: `Manuel Antunes`,
      start_url: `/`,
      background_color: `#000000`,
      theme_color: `#1E1E1E`,
      display: `standalone`,
      icon: `src/images/icon.png`,
    },
  },
  {
    resolve: `gatsby-plugin-styled-components`,
    options: {
      displayName: process.env.NODE_ENV !== 'production',
    },
  },
  `gatsby-plugin-offline`, // this plugin must always be the last in the list
  'gatsby-plugin-postcss',
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  'gatsby-plugin-robots-txt',
  `gatsby-transformer-sharp`,
];

export default plugins;