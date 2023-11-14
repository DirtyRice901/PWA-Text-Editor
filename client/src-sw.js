////////////// imports ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

////////////// precache all files in webpack manifest /////////////////////////////////////////////////////////////////////////////////////
precacheAndRoute(self.__WB_MANIFEST); 

////////////// set up page cache //////////////////////////////////////////////////////////////////////////////////////////////////////////
const pageCache = new CacheFirst({ 
  cacheName: 'page-cache', // name of cache storage

  ///////// cacheable response plugin /////////////////////////////////////////////////////////////////////////////////////////////////////
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

////////////// set up page cache //////////////////////////////////////////////////////////////////////////////////////////////////////////
warmStrategyCache({ 
  urls: ['/index.html', '/'], // array of urls to cache
  strategy: pageCache, // cache strategy
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

////////////// set up asset cache //////////////////////////////////////////////////////////////////////////////////////////////////////////
registerRoute(
  ///// define callback function that will fileter requests /////
  ({ request}) => ['style', 'script', 'worker'].includes(request.destination),
  ////// name of cache storage //////////////////////////////////
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      ///////// cacheable response plugin ///////////////////////
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),

      ///////// expiration plugin ///////////////////////////////
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      })
    ],
  })
  );

    

