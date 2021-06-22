'use strict';

const express = require('express');
const http = require('http'), { exec } = require('child_process');

// Constants
const PORT = 7778;
const HOST = '0.0.0.0';

const app = express();
app.get('/token', (req, res) => {
  exec('gcloud auth print-identity-token', (err, stdout, stderr) => {
    console.info({ err, stdout, stderr });
    if (err) {
      return res.writeHead(500).end(JSON.stringify(err));
    }
    stdout = stdout.replace(/(\r\n|\n|\r)/gm, "");
    return res.writeHead(200).end(stdout);
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);