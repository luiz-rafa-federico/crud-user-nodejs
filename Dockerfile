FROM node

WORKDIR /code

COPY . /code/

RUN npm install

EXPOSE 3000
