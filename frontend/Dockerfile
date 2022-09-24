FROM node:16.16-alpine3.15 as build-stage
COPY . /code
WORKDIR /code
RUN npm install
RUN npm run build

FROM nginx:stable
COPY --from=build-stage /code/build /usr/share/nginx/html
