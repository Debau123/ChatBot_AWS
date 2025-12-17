# Chatbot de Becas - Generalitat Valenciana

Un chatbot inteligente desarrollado con Astro y AWS Bedrock para ayudar con consultas sobre becas de la Generalitat Valenciana.

## 🚀 Características

- Interfaz de chat moderna y responsive tipo WhatsApp
- Integración con AWS Bedrock Knowledge Base
- Guardrail de contenido (InformacionLegal)
- Diseño profesional con los colores de la Generalitat Valenciana
- Respuestas en tiempo real con formato mejorado
- Indicador de escritura animado

## 📋 Requisitos Previos

- Node.js 18 o superior
- Cuenta de AWS con acceso a Bedrock
- Credenciales de AWS (Access Key y Secret Key)

## 🛠️ Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Debau123/ChatBot_AWS.git
cd ChatBot_AWS
```

2. Instalar dependencias:

```bash
npm install
```

## ⚙️ Configuración

1. Copiar el archivo de ejemplo:

```bash
cp .env.example .env
```

2. Configurar las variables de entorno en `.env`:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
KNOWLEDGE_BASE_ID=MQR2GQQVAY
GUARDRAIL_ID=nqlb277f4ejd
GUARDRAIL_VERSION=DRAFT
MODEL_ARN=arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-pro-v1:0
```

### Desarrollo Local con AWS SSO

Si usas AWS SSO localmente, puedes omitir `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY`. El código usará automáticamente tu perfil SSO configurado.

## 🏃 Ejecución Local

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

## 🚀 Despliegue en Vercel

1. Subir el proyecto a GitHub (ya realizado)

2. Importar el proyecto en Vercel desde GitHub

3. Configurar las variables de entorno en Vercel:
   - `AWS_REGION`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `KNOWLEDGE_BASE_ID`
   - `GUARDRAIL_ID`
   - `GUARDRAIL_VERSION`
   - `MODEL_ARN`

4. Desplegar

**Nota importante**: Para Vercel necesitas credenciales IAM de AWS, no funciona con SSO.

### Crear credenciales IAM para Vercel

1. Ve a AWS IAM Console
2. Crea un nuevo usuario con acceso programático
3. Asigna los permisos necesarios para Bedrock:
   - `bedrock:InvokeModel`
   - `bedrock:RetrieveAndGenerate`
4. Guarda las credenciales (Access Key ID y Secret Access Key)
5. Configura estas credenciales en las variables de entorno de Vercel

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
