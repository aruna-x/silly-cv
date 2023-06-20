# SillyCV Chatbot

## A personal CV assistant

Ask SillyCV questions about my work experience. Adjust the personality at the bottom, for fun.

## To run locally

- `npm install`
- add OpenAI key to .env with variable 'VITE_OPENAI_KEY'
- replace '/silly-cv/' with your own base for Github Actions auto-deploy in `vite.config.js`
- `npm run dev`

## Extensibility

- integrate LangChain to build a feature that allows a user to input a LinkedIn profile url for use as the CV
