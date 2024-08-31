import { randomUUID } from "crypto";
import { sql } from "./dbConnection.js";

export class DataBasePostgres {
  #video = new Map();

  async list(search) {
    let videoList;

    if (search) {
      videoList = await sql`SELECT * FROM videos WHERE title ILIKE ${"%" + search + "%"};`;
    } else {
      videoList = await sql`SELECT * FROM videos;`;
    }

    return videoList;
  }

  async create(videoData) {
    const { title, description, duration } = videoData;

    await sql`INSERT INTO videos VALUES (${randomUUID()}, ${title}, ${description}, ${duration});`;
  }

  async update(videoID, videoData) {
    const { title, description, duration } = videoData;

    await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${videoID};`;
  }

  async delete(videoID) {
    await sql`DELETE FROM videos WHERE id = ${videoID}`;
  }
}
