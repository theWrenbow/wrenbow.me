<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/socials.php';

Route::inertia('/', 'terminal/Terminal')->name('home');
// Route::inertia('/ttyd', 'terminal/Terminal')->name('terminal');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
