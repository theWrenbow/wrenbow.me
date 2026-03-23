<?php

use Illuminate\Support\Facades\Route;

// Misc. Redirects

// Aimbow Method
Route::redirect('/aimbow-method-warmup-aimlabs', 'https://steamcommunity.com/sharedfiles/filedetails/?id=3616054866', 301)->name('AimRoutine.AimbowMethodAimlabs');
Route::redirect('/aimbow-method-warmup-kovaaks', '/404', 301)->name('AimRoutine.AimbowMethodKovaaks');
Route::redirect('/aimbow-method-mini-aimlabs', '/404', 301)->name('AimRoutine.AimbowMethodMiniAimlabs');
Route::redirect('/aimbow-method-mini-kovaaks', '/404', 301)->name('AimRoutine.AimbowMethodMiniKovaaks');
Route::redirect('/aimbow-method-v2-warmup-aimlabs', 'https://steamcommunity.com/sharedfiles/filedetails/?id=3625278023', 301)->name('AimRoutine.AimbowMethodV2Aimlabs');
Route::redirect('/aimbow-method-v2-warmup-kovaaks', '/404', 301)->name('AimRoutine.AimbowMethodV2Kovaaks');
Route::redirect('/aimbow-method-v2-mini-aimlabs', '/404', 301)->name('AimRoutine.AimbowMethodV2MiniAimlabs');
Route::redirect('/aimbow-method-v2-mini-kovaaks', '/404', 301)->name('AimRoutine.AimbowMethodV2MiniKovaaks');
Route::redirect('/aimstars-method', '/404', 301)->name('AimRoutine.AimstarsMethod');
