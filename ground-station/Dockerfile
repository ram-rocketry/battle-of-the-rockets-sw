# syntax=docker/dockerfile:1
FROM node

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm i

COPY . .
EXPOSE 12700
CMD ["npm", "run", "dev"]
