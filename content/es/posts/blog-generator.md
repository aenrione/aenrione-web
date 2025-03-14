---
title: "El arte de bloguear: Mejora tu estilo con LLM's y LangChain"
date: 2025-03-13T20:08:17-03:00
draft: false
---

Imagina este escenario: Acabas de pasar una larga jornada de trabajo, lidiando con códigos, errores y bugs que parecen tener vida propia. Te apetece compartir tus experiencias con el mundo a través de tu blog, pero tus dedos se sienten como pesas de plomo sobre el teclado. ¿Te suena familiar? No te preocupes, amigo mío, estás en el lugar correcto. Te presento una solución a tu problema, fruto de muchas noches de insomnio y de mi amor por la automatización: el mágico mundo de los LLM's y LangChain.

### ¿Qué son los LLM's y LangChain?

Los LLM's (Language Models) son modelos de aprendizaje automático que se entrenan para predecir la siguiente palabra en una oración, basándose en las palabras anteriores. En otras palabras, se trata de un oráculo de texto que puede generar contenido coherente y relevante en función de un contexto dado.

Por otro lado, tenemos a LangChain, una biblioteca de Python que facilita la manipulación y el análisis de texto en lenguaje natural. Es similar a un navaja suiza del procesamiento de lenguaje natural, llena de funciones útiles para todo tipo de tareas de texto.

### Cómo comenzó todo

Un día, mientras luchaba contra un bloqueo de escritor, se encendió una bombilla en mi cabeza. ¿Qué pasaría si pudiera usar mis antiguos posts de blog para entrenar un modelo de lenguaje que pudiera escribir nuevos posts por mí? La idea me pareció tan emocionante que no pude resistirme a probarla. Así es como nació mi proyecto [Blog Generator](https://github.com/aenrione/blog-generator).

### ¡Manos a la obra!

Primero, recopilé todos mis antiguos posts de blog de aenrione.xyz y los usé como datos de entrenamiento para mi modelo de lenguaje. A continuación, utilicé LangChain para procesar los textos y prepararlos para el entrenamiento.

Después, puse manos a la obra con Streamlit, una biblioteca de Python que permite desarrollar aplicaciones web rápidamente. Con Streamlit, pude crear una interfaz de usuario sencilla para mi generador de blogs. Esta interfaz me permitía introducir un tema y recibir un borrador de post de blog generado por la máquina.

Finalmente, utilicé la API de OpenAI para acceder a su potente modelo de lenguaje GPT-3 y poner a prueba mi generador de blogs. Y, para mi deleite, los resultados fueron asombrosos.

### Mis planes para el futuro

Aunque estoy muy satisfecho con lo que he logrado hasta ahora, todavía tengo grandes planes para mejorar este proyecto. Me encantaría añadir más modelos de lenguaje para ofrecer aún más diversidad en la generación de textos. Además, planeo "dockerizar" el repositorio para facilitar su despliegue en diferentes entornos. Y, por último, quiero integrar el generador directamente en mi repositorio de blog, para que pueda publicar automáticamente los posts generados.

### En conclusión

Puede que todavía no sea capaz de escribir la próxima gran novela, pero mi generador de blogs me ha ahorrado muchas horas de escritura, y ha añadido un poco de chispa a mis posts. Si te gusta la idea de tener tu propio generador de blogs personalizado, te invito a probar mi herramienta. ¡Quién sabe, tal vez te inspire a crear tu propia versión!

