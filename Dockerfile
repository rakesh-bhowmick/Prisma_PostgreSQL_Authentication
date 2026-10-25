FROM node:22.18.0
WORKDIR /app
COPY ./package*.json /app/
# npm ci is install dipendices based on package-lock.json and npm install use package.json. 
# in package.json i have "^" this sign it's automatically install compatable version thats why i use npm ci
RUN npm ci
COPY . /app/
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "start"]