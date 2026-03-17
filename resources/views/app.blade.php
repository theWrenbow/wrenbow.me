<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'wrenbow🌈🕊️') }}</title>

        <link rel="canonical" href="https://wrenbow.me" />

        <meta name="title" content="wrenbow🌈🕊️" />
        <meta name="description" content="@theWrenbow — software developer // rational thinker // meme connoisseur // denizen of the cyberpunk dystopia we call the 21st century" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wrenbow.me" />
        <meta property="og:title" content="wrenbow🌈🕊️" />
        <meta property="og:site_name" content="wrenbow🌈🕊️" />
        <meta property="og:locale" content="en_US" />
        {{-- <meta property="og:locale:alternate" content="de_DE" /> --}}
        {{-- <meta property="og:locale:alternate" content="es_ES" /> --}}
        <meta property="og:description" content="@theWrenbow — software developer // rational thinker // meme connoisseur // denizen of the cyberpunk dystopia we call the 21st century" />
        <meta property="og:image" content="https://wrenbow.me/images/og/wrenbow-home.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://wrenbow.me" />
        <meta property="twitter:title" content="wrenbow🌈🕊️" />
        <meta property="twitter:description" content="@theWrenbow — software developer // rational thinker // meme connoisseur // denizen of the cyberpunk dystopia we call the 21st century" />
        <meta property="twitter:image" content="https://wrenbow.me/images/og/wrenbow-home.png" />

        <link rel="apple-touch-icon" sizes="57x57" href="/images/ico/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/images/ico/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/images/ico/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/images/ico/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/images/ico/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/images/ico/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/images/ico/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/images/ico/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/images/ico/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/images/ico/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/ico/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/images/ico/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/ico/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <meta name="msapplication-TileColor" content="#fdbdb4">
        <meta name="msapplication-TileImage" content="/images/ico/ms-icon-144x144.png">
        <meta name="theme-color" content="#fdbdb4">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @vite(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
