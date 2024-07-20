FROM node:20-alpine3.19 as build

# Build App
WORKDIR /fix-it
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /fix-it/dist .
# add nginx config
COPY nginx.conf etc/nginx/sites-available/default
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]