FROM node:20-alpine3.19
# Declare build time environment variables
ARG MONGODB_URI
ARG S3_BUCKET
ARG ACCESS_KEY
ARG SECRET_KEY

# Set default values for environment variables
ENV MONGODB_URI=$MONGODB_URI
ENV S3_BUCKET=$S3_BUCKET
ENV ACCESS_KEY=$ACCESS_KEY
ENV SECRET_KEY=$SECRET_KEY

WORKDIR /fix-it
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start" ]