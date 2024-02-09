const express = require('express');
const exec = require('child_process').exec;
const path = require('path');
const app = express();
const port = 5305;


app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../html/index.html'));
});

app.get('/runScript', (req) => {
    const track = Number(req.query.selectedTrack) + 1;
    const scriptPath = path.join(__dirname, '../bash-scripts/load-arduino-code.sh');
    const shellLoadScript = exec(`bash ${scriptPath} ${track}`);

    shellLoadScript.stdout.on('data', (data)=>{
    console.log(data); 
    });
    shellLoadScript.stderr.on('data', (data)=>{
        console.error(data);
    });
    console.log("executed")

});  

app.get('/controlexec', (req) => {
    const command = req.query.command;
    const scriptPath = path.join(__dirname, '../bash-scripts/code-exec.sh');
    const shellControlScript = exec(`bash ${scriptPath} ${command}`);

    shellControlScript.stdout.on('data', (data)=>{
    console.log(data); 
    });
    shellControlScript.stderr.on('data', (data)=>{
        console.error(data);
    });
    console.log("executed2")

});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});      



