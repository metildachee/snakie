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