---
title: "Construyendo FiNoSync: Mi app de finanzas personales para la realidad chilena"
published: 2026-03-10T23:22:00-03:00
draft: true
description: "Why I built a personal finance monorepo integrating Fintoc, Buda, and Fintual — and what I learned along the way."

tags:
- rails
- react-native
- chile
- fintech
lang: "es"
---

# Construyendo FiNoSync: Mi app de finanzas personales para la realidad chilena

Siempre tuve una relación complicada con mi propia plata. No de forma dramática — gano, gasto, intento ahorrar — pero nunca *sabía* realmente qué estaba pasando. Mi cuenta corriente estaba en una app, mi cripto en Buda, y mis inversiones en Fintual en otra pestaña que me olvidaba de revisar. A fin de mes intentaba reconciliar todo a mano y siempre me rendía a la mitad.

Así que hice lo que hace cualquier desarrollador cuando no encuentra la herramienta que necesita: la construí.

## El problema con las apps existentes

Hay miles de apps de presupuesto. Mint, YNAB, Fintool — todas funcionan razonablemente bien si vivís en Estados Unidos. Pero en Chile el panorama financiero es diferente. Tenemos Fintoc para agregación bancaria, Buda para cripto, Fintual para inversiones de bajo costo en fondos indexados. Ninguna de las apps mainstream habla con estos servicios. Y yo no iba a importar CSVs manualmente cada semana.

Necesitaba algo que entendiera mi realidad.

## Presentando FiNoSync

[FiNoSync](https://github.com/aenrione/finosync) es un monorepo de gestión de finanzas personales: un backend en Rails y una app móvil en React Native que se conectan realmente a los servicios financieros que uso a diario.

La idea central es simple: un solo lugar para ver todo. Saldos bancarios desde Fintoc, holdings de cripto desde Buda, retornos de inversión desde Fintual — todo agregado, categorizado y visualizado. Agregás tus propias transacciones manuales encima, y finalmente tenés el panorama completo.

## El stack

Uso una estructura de monorepo con **pnpm workspaces** y **Turborepo** para la orquestación de builds. El repo se ve así:

```
finosync/
├── apps/
│   ├── backend/   # Rails 8 API
│   └── mobile/    # React Native + Expo
└── packages/
    ├── eslint-config/
    └── typescript-config/
```

Esta estructura me permite compartir configuraciones de TypeScript y ESLint en todo el proyecto sin duplicar nada. `pnpm dev` levanta todo a la vez. Turborepo se encarga de los builds incrementales para no recompilar lo que no cambió.

### Backend: Rails 8 API

Elegí **Ruby on Rails 8** (modo API-only) para el backend. Puede parecer una elección inusual junto a un frontend muy TypeScript, pero Rails es genuinamente excelente para este tipo de trabajo CRUD con bastante data. Active Record maneja la complejidad de las relaciones de datos financieros de forma limpia, y el ecosistema para jobs en background (Sidekiq) es sólido como piedra.

Para la base de datos uso **SQLite3** en desarrollo. Es simple, es rápida, y para una app personal no hay cargas de escritura concurrentes que la estresen. Los jobs en background con Sidekiq sincronizan datos desde APIs externas de forma programada, así la app móvil siempre tiene datos frescos sin martillar los rate limits de terceros.

La autenticación es basada en sesiones con **bcrypt** — nada sofisticado, pero seguro.

### Mobile: React Native + Expo

La app móvil corre en **React Native con Expo SDK 53**. Expo Router maneja la navegación con un enfoque basado en archivos similar a Next.js, lo que aprecio por su claridad. La UI está construida con **Gluestack UI** estilizado a través de **NativeWind** (Tailwind para React Native), lo que significa que escribo clases de Tailwind y obtengo diseño consistente en iOS y Android sin pelear con StyleSheet.

Para el manejo de estado:
- **Zustand** para el estado local del cliente — liviano y no me obliga a escribir reducers.
- **React Query** para el estado del servidor — caché, refetch y estados de loading manejados automáticamente.

La internacionalización está hecha con **i18next** soportando EN y ES desde el inicio.

## Las integraciones

Esta es la parte de la que más me enorgullezco.

**Fintoc** me da acceso de lectura a cuentas bancarias chilenas vía open banking. Las transacciones llegan normalizadas, categorizadas y con datos del comercio. Es genuinamente una de las mejores APIs fintech con las que he trabajado.

**Buda** es el principal exchange de cripto en Chile. Su API es limpia y la uso para traer valores del portfolio en tiempo real en BTC, ETH, y lo que sea que esté holding en ese momento.

**Fintual** es la plataforma de inversión que uso para fondos indexados. Su API pública me permite traer valores actuales de los fondos y retornos, así puedo ver cómo va mi portfolio de largo plazo sin abrir otra app.

Los tres sincronizan via jobs en background, y la app móvil simplemente consulta la API de Rails. Los servicios externos son un detalle de implementación desde la perspectiva de la app.

## Soporte multi-moneda

Como Buda maneja activos denominados en USD y mis cuentas bancarias están en CLP, necesité manejo multi-moneda adecuado desde el inicio. FiNoSync soporta múltiples monedas con conversión en tiempo real, así el dashboard siempre muestra una vista consolidada única sin importar en qué denominación vive cada activo.

## Lo que aprendí

**Los monorepos valen la pena para proyectos full-stack.** Solo las configuraciones compartidas me ahorran suficiente tiempo para justificar el setup. El caché de Turborepo hace el CI rápido una vez que lo tenés configurado.

**Rails todavía rompe.** Estuve dudando si usar algo más JavaScript-nativo como Fastify o Hono, pero la productividad de Rails para backends con mucha data es difícil de superar. Migraciones con Active Record, integración con Sidekiq, y un ecosistema maduro de testing — todo simplemente funciona.

**Diseñá para tu propio caso de uso primero.** Las integraciones que hacen útil a FiNoSync para mí son las que lo hacen inútil para alguien en otro país. Está bien. Construí esto para mi realidad, y genuinamente mejoró cómo controlo mis finanzas.

## Probalo vos también

El proyecto es open source en [github.com/aenrione/finosync](https://github.com/aenrione/finosync). Si estás en Chile y usás alguno de estos servicios, lo vas a encontrar útil. Si estás en otro lugar, la arquitectura y el setup del monorepo igual puede valer la pena explorar.

Empezar es sencillo:

```bash
# Clonar e instalar
git clone https://github.com/aenrione/finosync
cd finosync
pnpm install

# Backend
cd apps/backend
bundle install
bin/rails db:setup

# Correr todo
pnpm dev
```

Configurá tus API keys en los archivos `.env` para Fintoc, Buda y Fintual, y ya estás corriendo.

¿Finalmente saber dónde está mi plata? Valió cada commit.