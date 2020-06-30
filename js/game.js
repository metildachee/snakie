class Level {
    constructor(id, name, speed, food, barrier, expandFactor) {
        this.id = id;
        this.name = name;
        this.scores = [];
        this.speed = speed;
        this.food = food;
        this.expandFactor = expandFactor;
        this.barrier = barrier;
    }
    addNewRecord(name, score) {
        this.scores.push([name, score]);
        this.scores.sort();
    }
    updateScore(name, score) { this.scores.find(pair=> pair[0] == name)[1] = score; }
    getScores() { return this.scores.sort((a, b)=> { return b[1] - a[1]}); }
    getScore(username) { return this.scores.find(pair=> pair[0] == username)[1]; }
}

let easyLvl = new Level(0, "easy", 500, 5, 0, 1);
let modLvl = new Level(1, "mod", 300, 1, 0, 1);
let diffLvl = new Level(2, "diff", 250, 1, 10, 3);
let freakLvl = new Level(3, "freak", 250, 1, 20, 4);
let hellLvl = new Level(4, "hell", 300, 1, 100, 5);
let lvls = [easyLvl, modLvl, diffLvl, freakLvl, hellLvl];

let gistId = "";
function getGist() {
    console.log("getting gists");
    $(document).ready(function() {
        $.ajax({ 
            // url: 'https://api.github.com/users/metildachee/gists',
            url: `https://api.github.com/users/${USERNAME}/gists`,
            type: 'GET',
        }).done( response => $.ajax({
            url:`https://api.github.com/gists/${response[0].id}`,
            type: `GET`,
        }).done( object => { 
            console.log(object);
            array = JSON.stringify(object.files.snake_logs.content);
            console.log(array);
            let holyGrail = [];
            array.split("/").forEach((arr, i) => {
                let temp = [];
                let keyPair = [];
                arr.split(",").forEach((ele, index) => {
                    index % 2 == 0 ? keyPair.push(ele) : keyPair.push(parseInt(ele));
                    index % 2 == 0 ? temp.push(keyPair) : keyPair = [];
                })
                holyGrail.push(temp);
            })
            lvls[0].scores = holyGrail[0];
            lvls[0].scores[0][0] = lvls[0].scores[0][0].substring(1);
            console.log(lvls[0].scores[0][0]);
            lvls[1].scores = holyGrail[1];
            lvls[2].scores = holyGrail[2];
            lvls[3].scores = holyGrail[3];
            lvls[4].scores = holyGrail[4];
            console.log(holyGrail);
            gistId = object.id;
            console.log(gistId);
        }));
    }) 
}

function updateGist() {
    console.log("update gist called");
    let content = lvls[0].scores +  "/" + lvls[1].scores + "/" + lvls[2].scores + "/" + lvls[3].scores + "/" + lvls[4].scores;
    $.ajax({ 
        url: `https://api.github.com/gists/${gistId}`,
        type: 'PATCH',
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("Authorization", "token " + SECRET_TOKEN); 
        },
        data: '{"description": "snake_logs updated","files": {"snake_logs": {"content": "' + content + '"}}}'
    }).done( response=> {
        console.log(response);
    })
}