FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json tsconfig.json ./
RUN npm install
COPY . .
RUN npx prisma generate || true
RUN npm run build || true
EXPOSE 4000
CMD ["node", "dist/main.js"]
