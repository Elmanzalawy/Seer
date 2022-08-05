<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ env('APP_NAME') }}</title>

        @vite(['resources/css/app.css', 'resources/js/app.js'])

    </head>
    <body>
        <div id="app">
            {{-- <Navbar :appName="{{ env('VITE_APP_NAME') }}" :user="{{auth()->user() ?? null}}"></Navbar> --}}
            <router-view></router-view>
            {{-- <Foot></Foot> --}}
        </div>
    </body>
</html>
