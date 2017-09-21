<template>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <link rel="manifest" href="/public/manifest.json">
            <script src="https://unpkg.com/vue/dist/vue.js"></script>
            <script src="node_modules/axios/dist/axios.min.js"></script>
            <script src="node_modules/vue-axios/dist/vue-axios.min.js"></script>
        </head>
        <body>
            {{{app}}}
            {{{script}}}
            <script src="node_modules/mdbootstrap/js/jquery-2.2.3.min.js"></script>
            <script src="node_modules/mdbootstrap/js/tether.min.js"></script>
            <script src="node_modules/mdbootstrap/js/bootstrap.min.js"></script>
            <script src="node_modules/mdbootstrap/js/mdb.min.js"></script>
            <script>              
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', function() {
                        navigator.serviceWorker.register('/public/sw.js').then(function(registration) {
                        // Registration was successful
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                        }, function(err) {
                        // registration failed :(
                        console.log('ServiceWorker registration failed: ', err);
                        });
                    });
                }                                 
            </script>
        </body>
    </html>
</template>

<script>
</script>

<style>
</style>
