# Chatbot de Becas - Generalitat Valenciana

Un chatbot inteligente desarrollado con Astro y AWS Bedrock para ayudar con consultas sobre becas de la Generalitat Valenciana.

## 🚀 Características

- Interfaz de chat moderna y responsive
- Integración con AWS Bedrock (Claude)
- Diseño con los colores de la Generalitat Valenciana
- Respuestas en tiempo real
- Indicador de escritura animado

## 📋 Requisitos Previos

- Node.js 18 o superior
- Token de AWS Bedrock válido

## 🛠️ Instalación

1. Las dependencias ya están instaladas. Si necesitas reinstalarlas:

```bash
npm install
```

## ⚙️ Configuración

El archivo `.env` ya está configurado con tu token de Bedrock. El token tiene una validez de 12 horas.

Cuando el token expire, necesitarás actualizar la variable `AWS_BEARER_TOKEN_BEDROCK` en el archivo `.env` con un nuevo token.

## 🏃 Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El chatbot estará disponible en `http://localhost:4321`

Para construir para producción:

```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── layouts/
│   │   └── Layout.astro       # Layout base
│   ├── pages/
│   │   ├── api/
│   │   │   └── chat.ts        # Endpoint API para Bedrock
│   │   └── index.astro        # Página principal del chat
│   └── env.d.ts
├── .env                        # Variables de entorno (no compartir)
├── astro.config.mjs            # Configuración de Astro
└── package.json
```

## 🎨 Personalización

### Colores

Los colores principales están definidos como variables CSS en el archivo `index.astro`:

- `--primary-color`: #c41f3e (Rojo de la Generalitat)
- `--secondary-color`: #2c3e50
- `--background`: #f5f5f5

### Prompt del Sistema

El prompt del sistema se puede modificar en el archivo `src/pages/api/chat.ts` en la constante `SYSTEM_PROMPT`.

## 🔒 Seguridad

⚠️ **Importante**: El archivo `.env` contiene credenciales sensibles y no debe compartirse ni subirse a repositorios públicos. Ya está incluido en `.gitignore`.

## 🤖 Modelos de Bedrock

El chatbot actualmente usa el modelo `anthropic.claude-v2`. Puedes cambiar el modelo en el archivo `chat.ts` modificando el parámetro `modelId`.

Otros modelos disponibles:
- `anthropic.claude-v2:1`
- `anthropic.claude-instant-v1`
- `anthropic.claude-3-sonnet-20240229-v1:0`

## 📝 Notas

- El token Bearer de AWS Bedrock expira después de 12 horas
- El servidor debe estar en modo `server` para que funcionen los endpoints API
- La aplicación usa TypeScript en modo strict

## 🆘 Soporte

Si encuentras problemas:

1. Verifica que el token de Bedrock sea válido
2. Revisa los logs en la consola del navegador y del servidor
3. Asegúrate de que todas las dependencias estén instaladas correctamente

## 📄 Licencia

Este proyecto es para uso interno de la Generalitat Valenciana.
