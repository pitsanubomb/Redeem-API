FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN tsc
RUN npx prisma migrate dev --name init
RUN npx prisma generate
RUN chown -R node /usr/src/app
USER node
CMD ["node", "app.js"]
