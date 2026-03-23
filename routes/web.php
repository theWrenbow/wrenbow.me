<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/socials.php';
require __DIR__.'/redirects.php';

Route::inertia('/', 'Home')->name('home');
Route::inertia('/socials', 'Socials')->name('Socials');
Route::inertia('/aimbow', 'AimbowMethod')->name('AimbowMethod');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
