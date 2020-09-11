function reset() {
    localdata = initialData;
    iconItems = {};
    clearLog();
    log("Welcome to my simulation", "logregular");
    addGeneralData();
    AddCategoriesData();
    AddTabsData();
    addPerson();
    addPerson();
    addPerson();
    log("Found a muddy lake near the camp.", "logblue");
    log("Found a field of wheat.", "logblue");
    log("Found a large lush forest.", "logblue");
    log("There is a firepit but the fire is out.", "logblue");
}

function addGeneralData() {
    localdata.general = d.GeneralItems;
}

function AddCategoriesData() {
    localdata.categories = d.Categories;
}

function AddTabsData() {
    localdata.tabs = d.Tabs;
}


function addPerson(vhealth = 1000, logtext = undefined) {
    var guy =
    {
        name: generateName(),
        task: null,
        id: getSequenceId(),
        effort: 1,
        hunger: 1000,
        thirst: 1000,
        health: vhealth,
        maxhunger: 1000,
        maxthirst: 1000,
        maxhealth: vhealth,
        icon: "fas fa-user"
    };
    localdata.people.push(guy);
    if (logtext) {
        log(logtext, "logblue");
    }
}
function generateName() {
    var firstNames = ["David", "Markus", "Vincent", "Prince", "John", "Mario", "Willie", "Kim", "Edgar", "Henry", "Alan", "Claudia", "Lisa", "Bert", "Conrad", "Steward", "Joe", "Samuel", "Dave", "Pamela", "Toni", "Jerry", "Megan", "Anna", "Benny", "Charlie", "Melinda", "Tracy", "Owen", "Lauren"];
    var lastNames = ["Terry", "Skinner", "Norton", "Smith", "Benton", "Bell", "Welch", "Foster", "Marsh", "Manning", "Weaver", "Luna", "Reed", "Scott", "Park", "Stephens", "Gray", "Knight", "Butler", "Bass", "Wise", "Wilson", "Goodwin", "Reed", "Larson", "Brooks", "Long", "Summers", "Jackson", "Lambert"];
    var fname = firstNames[Math.floor(Math.random() * firstNames.length)];
    var lname = lastNames[Math.floor(Math.random() * lastNames.length)];
    return fname + " " + lname;
}

function getSequenceId() {
    if (!localdata.sequence) localdata.sequence = 0;
    return localdata.sequence++;
}


function clearLog() {
    localdata.logs = [];
}

function log(text, type = "loggreen", duplicates = true) {
    var hash = hashCode(text);
    if (!duplicates && localdata.logshash[hash] != undefined)
        return;

    if (!duplicates) {
        localdata.logshash[hash] = text;
    }
    var log =
    {
        text: text,
        type: type,
    };
    localdata.logs.push(log);
}
function hashCode(s) {
    var h = 0, l = s.length, i = 0;
    if (l > 0)
        while (i < l)
            h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h.toString();
};

function update(dt) {
    updateTasks(dt * speedup);
}