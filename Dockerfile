
FROM node:18-alpine AS production
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node ./drizzle ./drizzle
COPY --chown=node:node ./.husky ./.husky
RUN npm ci
COPY --chown=node:node . .
ENV NODE_ENV production
ENV CI true
RUN npm run build
RUN npm ci --only=production && npm cache clean --force
FROM node:18-alpine AS final
WORKDIR /usr/src/app
ARG NODE_ENV
ARG DATABASE_URL
ARG PORT
ARG JWT_ACCESS_SECRET
ENV NODE_ENV=$NODE_ENV
ENV DATABASE_URL=$DATABASE_URL
ENV PORT=$PORT
ENV JWT_ACCESS_SECRET=$JWT_ACCESS_SECRET
COPY --from=production /usr/src/app/package*.json ./
COPY --from=production /usr/src/app/node_modules ./node_modules
COPY --from=production /usr/src/app/dist ./dist
USER node
EXPOSE 3000
CMD [ "node", "dist/src/main.js" ]

