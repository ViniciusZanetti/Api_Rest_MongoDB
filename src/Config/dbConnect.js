import mongoose from "mongoose";

mongoose.connect("mongodb+srv://zanettsu:123@aluradz7.fqszk.mongodb.net/Alura-Node")

let db = mongoose.connection;

export default db;