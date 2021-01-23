FROM node:12.9.0-alpine as builder
WORKDIR '/app'
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --prod --extract-css=false

FROM nginx
EXPOSE 80
COPY --from=builder /app/dist/tourapp-ui /usr/share/nginx/html
