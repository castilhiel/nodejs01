// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   response.write("oiiiiiii");

//   return response.end();
// });

// server.listen(3333);

import { fastify } from "fastify";

import { DataBaseMemory } from "./dataBase.js";
const dataBaseMemory = new DataBaseMemory();

import { DataBasePostgres } from "./dataBasePostgres.js";
const dataBasePostgres = new DataBasePostgres();

import { sql } from "./dbConnection.js";

const server = fastify();

server.get("/videoList", async (request) => {
  const search = request.query.search;

  //   const videoList = await dataBasePostgres.list(search);

  //   return videoList;

  // =================================================

  return dataBaseMemory.list(search);
});

server.post("/newVideo", (request, response) => {
  const { title, description, duration } = request.body;

  dataBasePostgres.create({
    title,
    description,
    duration,
  });

  return response.status(201).send({
    message: "Video adicionado com sucesso.",
  });

  // =================================================

  //   dataBaseMemory.create({
  //     title,
  //     description,
  //     duration,
  //   });

  //   return response.status(201).send({
  //     message: "Video adicionado com sucesso.",
  //   });
});

server.put("/updateVideo/:videoID", (request, response) => {
  const videoID = request.params.videoID;
  const { title, description, duration } = request.body;

  dataBasePostgres.update(videoID, {
    title,
    description,
    duration,
  });

  return response.status(200).send({ message: "Alguma informação do video foi alterada com sucesso." });

  // =================================================

  //   dataBaseMemory.update(videoID, {
  //     title,
  //     description,
  //     duration,
  //   });

  //   return response.status(200).send({ message: "Alguma informação do video foi alterada com sucesso." });
});

server.delete("/deleteVideo/:videoID", (request, response) => {
  const videoID = request.params.videoID;

  dataBasePostgres.delete(videoID);

  return response.status(200).send({
    message: "Video excluido com sucesso.",
  });

  // =================================================

  //   dataBaseMemory.delete(videoID);

  //   return response.status(200).send({
  //     message: "Video excluido com sucesso.",
  //   });
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
