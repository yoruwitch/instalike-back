import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão do ambiente
const connection = await conectarAoBanco(process.env.CONNECTION_STRING);

// Função assíncrona para obter todos os posts do banco de dados
export async function getAllPosts() {
    // Seleciona o banco de dados 'imersao-instalike'
    const db = connection.db("imersao-instalike");
    // Seleciona a coleção 'posts' dentro do banco de dados
    const collection = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return collection.find().toArray();
}
