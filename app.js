const express = require("express");
const csv = require("csv");
const fs = require("fs");
const cors = require("cors");
var colleges = [];

fs.readFile("./data/engineering colleges in India.csv", (err, data) => {
    csv.parse(data, function (err, data) {
        data.shift(); //remove first element from array that is usless data
        //console.log(data);
        data.sort(function (a, b) {
            return a[0].localeCompare(b[0]);
        });
        colleges = data;
    });
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/colleges/total", (req, res) => {
    const str = {
        total: colleges.length,
    };
    res.send(JSON.stringify(str));
});

app.get("/colleges/state", (req, res) => {
    if (req.query.name) {
        const name = req.query.name.toLowerCase();
        const result = [];
        for (let i = 0; i < colleges.length; i++) {
            if (colleges[i][11].toLowerCase().indexOf(name) >= 0) {
                colleges[i][0] = colleges[i][0].replace(/\:[^>]*\)/gi, "");
                result.push({
                    college_name: colleges[i][0],
                    city: colleges[i][10],
                    state: colleges[i][11],
                });
                if (result.length === 10) {
                    break;
                }
            }
        }
        //result.push(colleges.find((el) => el[0].includes(name)));
        res.send(JSON.stringify(result));
    }
});

app.get("/colleges", (req, res) => {
    //res.send(JSON.stringify(colleges));
    //console.log("req rec");
    //console.log(req.query);

    if (req.query.name) {
        const name = req.query.name.toLowerCase();
        const result = [];
        for (let i = 0; i < colleges.length; i++) {
            if (colleges[i][0].toLowerCase().indexOf(name) >= 0) {
                colleges[i][0] = colleges[i][0].replace(/\:[^>]*\)/gi, "");
                result.push({
                    college_name: colleges[i][0],
                    city: colleges[i][10],
                    state: colleges[i][11],
                });
                if (result.length === 10) {
                    break;
                }
            }
        }
        //result.push(colleges.find((el) => el[0].includes(name)));
        res.send(JSON.stringify(result));
    }
});

app.listen(PORT, () => {
    console.log("App running on port " + PORT);
});
