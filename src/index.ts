import express,{Request, Response} from "express";
import path from "path";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (request: Request, response: Response)=>{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then((res)=>{
        return res.json();
    })
    .then((data) =>{
        response.render("index", data);
    });
});

app.get('/pokemon/:name', (request: Request, response: Response) =>{
    const name = request.params.name;
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res)=> {return res.json()})
    .then((data)=>{
        response.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Pokémon</title>
            </head>
            <style>
                body{
                    background-color: azure;
                    font-family: Arial, Helvetica, sans-serif;
                }
                h1{
                    font-size: 5em;
                    text-align: center;
                }
                img{
                    border-radius: 50%;
                    background-color: antiquewhite;
                    display: block;
                    height: 50vh;
                    margin: 0px auto;
                }
            </style>
            <body>
                <h1>${data.name}</h1>
                <img src="${data.sprites.front_default}" alt="${data.name}">
            </body>
            </html>
        `);
    });
});

app.listen(3000, () =>{
    console.log("Servidor funcionando!");
});