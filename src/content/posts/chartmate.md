---
title: "Chartmate: Una app de escritorio para gestionar charts de Clone Hero y YARG"
published: 2026-03-16T15:41:00-03:00
draft: true
description: "Construí Chartmate para dejar de gestionar manualmente mi librería de Clone Hero. Busca en Encore, escanea tu Spotify y renderiza partituras reales."
lang: "es"
category: "Proyectos"
tags:
- Tauri
- Rust
- React
- TypeScript
- Open Source
---

Hay una secuencia de pasos que cualquier jugador de Clone Hero conoce de memoria: abrís el navegador, buscás una canción en [Encore](https://enchor.us), descargás el zip, lo descomprimís, movés la carpeta al lugar correcto, recargás el juego. Cinco pasos para agregar una canción. Multiplica eso por cada canción que querés agregar, y de repente la gestión de la librería consume más tiempo que jugar.

Me cansé de ese ritual. Construí **Chartmate**.

## El problema con cómo manejamos los charts hoy

Clone Hero y YARG — los dos mejores rhythm games gratuitos que existen — dependen de una enorme comunidad que crea y comparte charts personalizados. El catálogo de Encore tiene decenas de miles de canciones, pero el workflow de administrarlos es completamente manual.

No hay una app que te deje buscar desde el escritorio. No hay nada que compare tu librería local con la base de datos online para ver si hay versiones más nuevas. Y sobre todo, no hay nada que responda la pregunta más obvia para cualquier jugador: *¿de mis canciones favoritas de Spotify, cuáles tienen chart?*

Eso es lo que Chartmate resuelve.

## Qué hace la app

### Buscador de charts con descarga directa

Chartmate conecta con la API de Encore y te da una interfaz de búsqueda con filtros por instrumento, dificultad y tipo de batería. Cuando encontrás lo que querés, descargás directamente al folder de canciones que usás en Clone Hero o YARG. Sin descomprimir manualmente, sin mover archivos.

### Scanner de Spotify

Esta es la función que más me gusta. Conectás tu cuenta de Spotify y Chartmate escanea tus playlists, luego cruza cada canción contra la base de datos de Encore usando búsqueda fuzzy (combinando `fast-fuzzy` y distancia de Levenshtein para lidiar con títulos que no coinciden exactamente). El resultado: una lista de canciones que ya escuchás y que tienen chart disponible.

Es la diferencia entre "buscar qué hay" y "encontrar lo que ya querés".

### Visor de partituras de batería

Esta parte fue la más técnica de construir. Chartmate puede renderizar cualquier chart como una partitura real de batería — usando [VexFlow](https://www.vexflow.com/) para la notación musical y [Three.js](https://threejs.org/) para el highway de Clone Hero — con reproducción sincronizada de audio.

Podés ajustar la velocidad, activar o silenciar pistas individuales (batería, guitarra, bajo, voces) y cambiar entre niveles de dificultad. Es la forma más rápida de entender un chart antes de intentarlo en el juego.

### Actualizador de charts

Compara tu librería local contra Encore y te dice qué charts tienen versiones más nuevas disponibles. Útil cuando seguís a charters específicos que actualizan su trabajo.

## El stack técnico

El proyecto usa **Tauri v2** como framework de escritorio. La idea de Tauri es sencilla: en vez de empaquetar Chromium completo (como hace Electron), usa el webview del sistema operativo para el frontend y expone APIs seguras desde el backend en Rust. El resultado es un ejecutable mucho más liviano — del orden de megabytes en vez de cientos — con acceso al sistema de archivos y a puertos nativos del OS.

| Capa | Tecnología |
|------|------------|
| Framework de escritorio | Tauri v2 |
| Frontend | React 19, TypeScript, Tailwind CSS v4 |
| Backend | Rust |
| Base de datos local | SQLite via Kysely |
| Renderizado de charts | Three.js, VexFlow |
| Audio | Web Audio API |
| Parsing de charts | @eliwhite/scan-chart, parse-sng |

Para el parsing de audio uso `audio-decode` con `midifile` para los eventos MIDI del track de batería. Cada nota del chart se mapea a un golpe específico en la partitura usando VexFlow para generar la notación.

## La parte de Spotify: fuzzy matching a escala

El scanner de Spotify fue el problema más interesante de resolver. El desafío: Spotify tiene el título de una canción como lo registró el sello discográfico. Encore tiene el título como lo escribió el charter. Rara vez coinciden exactamente.

`"Don't Stop Believin'"` vs `"Don't Stop Believin"` vs `"Dont Stop Believin"` — tres variantes, misma canción.

La solución combina dos métricas: similitud fuzzy (`fast-fuzzy`) para encontrar candidatos cercanos, y distancia de edición de Levenshtein para rankearlos. Con un umbral calibrado para tolerar apóstrofes, signos de puntuación y capitalización variable, el matching funciona bien en la práctica. Para respetar los rate limits de Spotify usé `bottleneck` como limitador de concurrencia.

## Estado actual

Chartmate está en versión 0.1.0, funcional pero en desarrollo activo. El buscador, el scanner de Spotify y el visor de partituras funcionan. El updater de charts está implementado pero en refinamiento.

El repo es MIT en [github.com/aenrione/chartmate](https://github.com/aenrione/chartmate). Para correrlo:

```bash
git clone https://github.com/aenrione/chartmate.git
cd chartmate
pnpm install
pnpm tauri dev
```

Si jugás Clone Hero o YARG y tenés una librería que gestionar, probalo. Y si encontrás algo que no funciona como esperás, abrí un issue.

Al final, construí esto porque quería más tiempo para jugar y menos tiempo moviendo archivos. En eso, al menos, ya funciona.
