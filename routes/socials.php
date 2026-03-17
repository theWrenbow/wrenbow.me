<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

$socialsUtmParams = 'utm_source=wrenbow.me&utm_medium=redirect&utm_campaign=social_links';

// Platform Handles
$twitchHandle = 'theWrenbow';
$youtubeHandle = 'theWrenbow';
$odyseeHandle = 'theWrenbow';
$tiktokHandle = 'theWrenbow';
$kickHandle = 'wrenbow';
$linktreeHandle = 'theWrenbow';
$twitterHandle = 'theWrenbow';
$bskyHandle = 'wrenbow.me';
$mastodonHandle = 'wrenbow';
$instagramHandle = 'theWrenbow';
$patreonHandle = 'wrenbow';
$kofiHandle = 'theWrenbow';
$discordInviteCode = 'aeud5wScpT';

// Platform Redirects
Route::redirect('/twitch', 'https://twitch.tv/'.$twitchHandle.'?'.$socialsUtmParams)->name('Socials.Twitch');
Route::redirect('/youtube', 'https://www.youtube.com/@'.$youtubeHandle.'?'.$socialsUtmParams)->name('Socials.YouTube');
Route::redirect('/odysee', 'https://www.odysee.com/'.$odyseeHandle.':0?'.$socialsUtmParams)->name('Socials.Odysee');
Route::redirect('/tiktok', 'https://www.tiktok.com/@'.$tiktokHandle.'?'.$socialsUtmParams)->name('Socials.TikTok');
Route::redirect('/kick', 'https://kick.com/'.$kickHandle.'?'.$socialsUtmParams)->name('Socials.Kick');
Route::redirect('/linktree', 'https://linktr.ee/'.$linktreeHandle.'?'.$socialsUtmParams)->name('Socials.Linktree');
Route::redirect('/twitter', 'https://x.com/'.$twitterHandle.'?'.$socialsUtmParams)->name('Socials.Twitter');
Route::redirect('/bsky', 'https://bsky.app/profile/'.$bskyHandle.'?'.$socialsUtmParams)->name('Socials.BlueSky');
Route::redirect('/mastodon', 'https://mastodon.social/@'.$mastodonHandle.'?'.$socialsUtmParams)->name('Socials.Mastodon');
Route::redirect('/instagram', 'https://www.instagram.com/'.$instagramHandle.'?'.$socialsUtmParams)->name('Socials.Instagram');
Route::redirect('/patreon', 'https://www.patreon.com/c/'.$patreonHandle.'?'.$socialsUtmParams)->name('Socials.Patreon');
Route::redirect('/kofi', 'https://ko-fi.com/'.$kofiHandle.'?'.$socialsUtmParams)->name('Socials.KoFi');
Route::redirect('/discord', 'https://discord.gg/'.$discordInviteCode.'?'.$socialsUtmParams)->name('Socials.DiscordServer');

// Aliases
Route::redirect('/ttv', '/twitch');
Route::redirect('/twitch.tv', '/twitch');
Route::redirect('/yt', '/youtube');
Route::redirect('/youtu.be', '/youtube');
Route::redirect('/youtube.com', '/youtube');
Route::redirect('/odyssey', '/odysee');
Route::redirect('/oddyssey', '/odysee');
Route::redirect('/od', '/odysee');
Route::redirect('/odysee.com', '/odysee');
Route::redirect('/tt', '/tiktok');
Route::redirect('/ttk', '/tiktok');
Route::redirect('/ticktock', '/tiktok');
Route::redirect('/tiktok.com', '/tiktok');
Route::redirect('/kick.com', '/kick');
Route::redirect('/lt', '/linktree');
Route::redirect('/linktr.ee', '/linktree');
Route::redirect('/linktree.com', '/linktree');
Route::redirect('/x', '/twitter');
Route::redirect('/x.com', '/twitter');
Route::redirect('/twitter.com', '/twitter');
Route::redirect('/twitterx', '/twitter');
Route::redirect('/twitter-x', '/twitter');
Route::redirect('/xtwitter', '/twitter');
Route::redirect('/x-twitter', '/twitter');
Route::redirect('/bluesky', '/bsky');
Route::redirect('/bsky.app', '/bsky');
Route::redirect('/bsky.social', '/bsky');
Route::redirect('/mstdn', '/mastodon');
Route::redirect('/mstdn.social', '/mastodon');
Route::redirect('/mastodon.social', '/mastodon');
Route::redirect('/ig', '/instagram');
Route::redirect('/insta', '/instagram');
Route::redirect('/instagram.com', '/instagram');
Route::redirect('/ptrn', '/patreon');
Route::redirect('/patreon.com', '/patreon');
Route::redirect('/ko-fi', '/kofi');
Route::redirect('/ko.fi', '/kofi');
Route::redirect('/ko-fi.com', '/kofi');
Route::redirect('/discordserver', '/discord');
Route::redirect('/discord-server', '/discord');
Route::redirect('/discord_server', '/discord');
Route::redirect('/discord.gg', '/discord');
Route::redirect('/discord.com', '/discord');
Route::redirect('/dc', '/discord');
Route::redirect('/dsc', '/discord');

// Misc. Redirects
Route::redirect('/aimbow-method-aimlabs', '/404')->name('AimRoutine.AimbowMethodAimlabs');
Route::redirect('/aimbow-method-kovaaks', '/404')->name('AimRoutine.AimbowMethodKovaaks');
Route::redirect('/aimbow-method-mini-aimlabs', '/404')->name('AimRoutine.AimbowMethodMiniAimlabs');
Route::redirect('/aimbow-method-mini-kovaaks', '/404')->name('AimRoutine.AimbowMethodMiniKovaaks');
Route::redirect('/aimstars-method', '/404')->name('AimRoutine.AimstarsMethod');
