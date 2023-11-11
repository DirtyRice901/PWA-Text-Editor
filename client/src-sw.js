const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { cache } = require('webpack');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

////////////// set up asset cache /////////////////////////////////////
registerRoute(
  ///// define callback function that will fileter requests //////////
  ({ request}) => ['style', 'script', 'worker'].includes(request.destination),
  ////// name of cache storage //////////////////////////////
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

    

