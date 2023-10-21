import { fastify } from 'fastify';
import { DatabaseMemory } from './database-momory.js';
const server = fastify();
const database = new DatabaseMemory();

server.post('/videos', (req , res) => {
  const {title , description, duration} = req.body;

  database.create({
    title,
    description,
    duration,
  });

  return res.status(201).send();
});

server.get('/videos', (req , res) => {
    const videos = database.list();

    return videos;
});

server.put('/videos/:id', (req, res) => {
    const {title , description, duration} = req.body;
    const videoId = req.params.id;

    const video = database.update(videoId,  {
      title,
      description,
      duration,
    })

    return res.status(204).send();
});

server.delete('/videos/:id', (req, res) => {
   const idVideo = req.params.id;

   database.delete(idVideo);

   return res.status(204).send();
})

server.listen({
    port: 3333,
});