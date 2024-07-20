FROM node:20-alpine3.19
# Declare build time environment variables
ARG MONGODB_URI

# Set default values for environment variables
ENV MONGODB_URI=$MONGODB_URI

WORKDIR /fix-it
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start" ]