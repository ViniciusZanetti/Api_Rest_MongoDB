import db from './src/Config/dbConnect.js';
import livros from './src/Models/Livro.js';
import express from 'express';
import bodyParser from 'body-parser';

db.on("error", console.error.bind(console, "Erro de Conexão"));
db.once("open", () => {
    console.log('conexão com o banco feito com sucesso');
})

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

/*const livros = [
    {id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien'},
    {id: 2, titulo: 'O Hobbit', autor: 'J.R.R. Tolkien'},
    {id: 3, titulo: 'O Senhor dos Anéis - A Sociedade do Anel', autor: 'J.R.R. Tolkien'},
    {id: 4, titulo: 'O Senhor dos Anéis - As Duas Torres', autor: 'J.R.R. Tolkien'},
    {id: 5, titulo: 'O Senhor dos Anéis - As Ilhas do Leão', autor: 'J.R.R. Tolkien'},
    {id: 6, titulo: 'O Senhor dos Anéis - As Trevas do Fim do Universo', autor: 'J.R.R. Tolkien'},
]*/

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.get('/teste', (req, res) => {
    res.send('Testando servidor!');
})

app.get('/livros', async(req, res) => {
    res.send(livros);
})

app.post('/livros', (req, res) => {
    const livro = req.body;
    livros.push(livro);
    res.send(livro);
})

app.get('/livros/:id', (req, res) => {
    const livro = buscaLivro(req.params.id);
    res.send(livros[livro]);
    
})

app.put('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index] = req.body;
    res.send(livros[index]);
})

app.delete('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.send(livros);
})

function buscaLivro(id){
    return livros.findIndex(livro => livro.id == id);
}