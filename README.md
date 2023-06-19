# SillyCV Chatbot

## A personal CV assistant

Ask SillyCV questions about my work experience. Adjust the personality at the bottom, for fun.

## To run locally

- `npm install`
- add OpenAI key to .env with variable 'VITE_OPENAI_KEY'
- also in .env, add your own base for auto-deploy via Github Actions: 'VITE_BASE_DEPLOY_SITE'
- `npm run dev`

## Extensibility

- integrate LangChain to build a feature that allows a user to input a LinkedIn profile url for use as the CV
