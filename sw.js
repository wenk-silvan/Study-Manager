self.addEventListener('install', function(event) {
    console.log('SW Installed');
    event.waitUntil(
        caches.open('static')
        .then(function(cache) {
            cache.addAll([
                '/',
                'images/binary.jpg',
                'images/books_1.jpg',
                'images/default.png',
                'images/electronics.jpg',
                'images/english.jpg',
                'images/german.jpg',
                'images/history.jpg',
                'images/math.jpg',
                'images/physics.jpg',
                'images/schema.gif',
                'styles/shared.css',
                'styles/smfooter.css',
                'styles/smheader.css',
                'styles/subjects.css',
                'views/vue.js'
            ]);
        })
    )
});

self.addEventListener('activate', function() {
    console.log('SW Activated');
});

self.addEventListener('fetch', function(event) {
    console.log('SW fetching');
    event.respondWith(
        caches.match(event.request)
        .then(function(res) {
            if (res) {
                return res;
            } else {
                fetch(event.request);
            }
        })
    )
});