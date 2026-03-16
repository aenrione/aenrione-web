---
title: "Chartmate: A Desktop App for Managing Clone Hero and YARG Charts"
published: 2026-03-16T15:41:00-03:00
draft: true
description: "I built Chartmate to stop managing my Clone Hero library by hand. It searches Encore, scans your Spotify, renders real sheet music, and downloads directly to your songs folder."
lang: "en"
category: "Projects"
tags:
- Tauri
- Rust
- React
- TypeScript
- Open Source
---

There's a sequence of steps any Clone Hero player knows by heart: open the browser, search for a song on [Encore](https://enchor.us), download the zip, unzip it, move the folder to the right place, reload the game. Five steps to add one song. Multiply that by every song you want to add, and suddenly managing your chart library takes longer than actually playing.

I got tired of that ritual. I built **Chartmate**.

## The problem with how we manage charts today

Clone Hero and YARG — the two best free rhythm games out there — depend on a massive community that creates and shares custom charts. The Encore catalog has tens of thousands of songs, but the workflow for managing them is completely manual.

There's no app that lets you search from the desktop. There's nothing that compares your local library against the online database to check for newer versions. And most of all, there's nothing that answers the most obvious question for any player: *which of my favorite Spotify songs have a chart available?*

That's what Chartmate solves.

## What the app does

### Chart browser with direct download

Chartmate connects to the Encore API and gives you a search interface with filters for instrument, difficulty, and drum type. When you find what you want, you download directly to the songs folder you use in Clone Hero or YARG. No manual unzipping, no moving files.

### Spotify scanner

This is the feature I'm most proud of. You connect your Spotify account and Chartmate scans your playlists, then cross-references each song against the Encore database using fuzzy search (combining `fast-fuzzy` and Levenshtein distance to handle titles that don't match exactly). The result: a list of songs you already listen to that have a chart available.

It's the difference between "searching for what exists" and "finding what you already want."

### Drum sheet music viewer

This was the most technically challenging part to build. Chartmate can render any chart as actual drum notation — using [VexFlow](https://www.vexflow.com/) for the musical notation and [Three.js](https://threejs.org/) for the Clone Hero highway — with synchronized audio playback.

You can adjust playback speed, toggle individual audio tracks (drums, guitar, bass, vocals), and switch between difficulty levels. It's the fastest way to understand a chart before attempting it in-game.

### Chart updater

Compares your local library against Encore and tells you which charts have newer versions available. Useful when you follow specific charters who update their work.

## The technical stack

The project uses **Tauri v2** as the desktop framework. Tauri's idea is straightforward: instead of bundling a full Chromium instance (like Electron does), it uses the operating system's native webview for the frontend and exposes secure APIs from a Rust backend. The result is a much lighter executable — in the megabytes range instead of hundreds — with full access to the file system and native OS capabilities.

| Layer | Technology |
|-------|------------|
| Desktop framework | Tauri v2 |
| Frontend | React 19, TypeScript, Tailwind CSS v4 |
| Backend | Rust |
| Local database | SQLite via Kysely |
| Chart rendering | Three.js, VexFlow |
| Audio | Web Audio API |
| Chart parsing | @eliwhite/scan-chart, parse-sng |

For audio parsing I use `audio-decode` with `midifile` for the MIDI events on the drum track. Each chart note maps to a specific hit in the score using VexFlow to generate the notation.

## The Spotify part: fuzzy matching at scale

The Spotify scanner was the most interesting problem to solve. The challenge: Spotify has a song title as the record label registered it. Encore has the title as the charter wrote it. They rarely match exactly.

`"Don't Stop Believin'"` vs `"Don't Stop Believin"` vs `"Dont Stop Believin"` — three variants, same song.

The solution combines two metrics: fuzzy similarity (`fast-fuzzy`) to find close candidates, and Levenshtein edit distance to rank them. With a threshold calibrated to tolerate apostrophes, punctuation, and variable capitalization, the matching works well in practice. To respect Spotify's rate limits I used `bottleneck` as a concurrency limiter, processing calls in controlled batches.

## Current state

Chartmate is at version 0.1.0 — functional but in active development. The browser, Spotify scanner, and sheet music viewer all work. The chart updater is implemented but still being refined.

The repo is MIT at [github.com/aenrione/chartmate](https://github.com/aenrione/chartmate). To run it:

```bash
git clone https://github.com/aenrione/chartmate.git
cd chartmate
pnpm install
pnpm tauri dev
```

If you play Clone Hero or YARG and have a library to manage, give it a try. If something doesn't work the way you'd expect, open an issue.

I built this because I wanted more time playing and less time moving files around. On that count, at least, it already works.
