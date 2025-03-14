---
title: "Manejando mis finanzas"
date: 2022-05-30T12:46:39-04:00
draft: false
tags:
- React-Native
- Ruby-on-Rails
---
# Contexto

En el último tiempo me he visto interesado en mejores maneras de poder ahorrar,
para poder llegar a fin de mes más tranquilo y lograr tener un colchón para el
futuro. En este descubrimiento, he descubierto algunas plataformas como
Buda.com para manejar inversiones en criptomonedas y Fintual, para poder
generar inversiones manejadas por sus “expertos”. Con la volatilidad del
mercado actual (al escribir esta publicación), es necesario hacer un
seguimiento de los cambios para poder tener una mejor idea de cómo van
mejorando o empeorando las cosas. Las plataformas de Buda y Fintual tienen de
por interfaces que te ayudan a ver estos cambios, pero lo hacen de una manera
que no se hace cómodo estar revisando constantemente sus herramientas por
separado.

# Solución: Mi propia API
Debido a esto, me decidí a crear una alternativa personalizada para mis
servicios actuales, con el objetivo de tener un mejor entendimiento sobre mi
información financiera. Con esto nace [budget-tracker-rails](https://github.com/aenrione/budget-tracker-rails), una API Rest
creada en Ruby on Rails que se encarga de mantenerse constantemente actualizado
sobre mis saldos y gastos, como proporcionar gráficos para poder entender mejor
como estoy manejando mis ahorros. Para lograr esto, hice ayuda de herramientas
existentes como [Fintoc](https://fintoc.com/) y su API, como también de
adaptaciones a APIs existentes con mis gemas de [buda](https://buda.com) y [fintual](https://fintual.cl). Con esto mi
API puede obtener mi información sobre mis cuentas bancarias, mis inversiones
en cripto y en el mercado en general de una manera segura y dinámica.

# Interfaz
Una vez teniendo mi API, necesitaba una manera cómoda de verlo, por lo que opté
por crear una aplicación móvil con el objetivo de acceder fácilmente a esta
información. En consecuencia cree [budget-tracker-react](https://github.com/aenrione/budget-tracker-react), una aplicación basada en
React Native que me proporciona una interfaz gráfica para acceder a mi API.
Esta me brinda un panel general donde ver mis últimas transacciones así como
mis indicadores generales además de un panel de detalles que me proporciona
diferentes gráficos para visualizar los cambios que se han dado en los últimos
meses.


