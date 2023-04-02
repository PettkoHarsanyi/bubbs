#!/usr/bin/env node

const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var cors = require('cors')
const port = process.env.PORT || '3000'

app.use(cors())
app.use(bodyParser.json());       // to support JSON-encoded bodies

app.get('/getplayers', (req, res) => {
    res.send(readData());
})

app.post("/saveplayer", (req, res) => {
    var newPlayer = req.body;

    var data = readData();
    var isAlready = false;
    
    data = data.map((player,index)=>{
        if(player.name == newPlayer.name){
            isAlready = true;
            console.log(newPlayer.points + " " + player.points);
            if(newPlayer.points > player.points){
                return {name: player.name, points: newPlayer.points}
            }
        }
        return player;
    })

    if(!isAlready){
        data.push(newPlayer);
    }

    data.sort((a,b)=> b.points - a.points)

    writeData(data);

    res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function readData() {
    const fs = require('fs');

    let data = fs.readFileSync('players.json');
    let json = JSON.parse(data);

    return json;
}

function writeData(data) {
    const fs = require('fs');
    
    let stringified_data = JSON.stringify(data);

    fs.writeFileSync('players.json',stringified_data)
}