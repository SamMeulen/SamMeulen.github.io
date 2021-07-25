//classes
class Building {

    constructor(name, floors) {
        this.name = name;
        this.floors = floors;
    }
}

let generate_button = document.getElementById('generate_button');

generate_button.onclick = function () {
    generate_buildings(document.getElementById('amount_of_buildings').value);
};

function generate_buildings(amount_of_buildings) {
    const default_amount = 4;
    const min_amount = 1;
    const max_amount = 15;
    let building_data;

    if (isNaN(amount_of_buildings) || amount_of_buildings < min_amount || amount_of_buildings > max_amount) {
        amount_of_buildings = default_amount
    }
    building_data = create_building_object(Math.round(amount_of_buildings));
    create_table(building_data);
}

function create_building_object(amount_of_buildings) {

    let buildings_returned = [];
    let all_buildings_array = create_building_all();

    for (let i = 0; i < amount_of_buildings; i++) {

        // Get unique buildings
        let random_building = Math.round(Math.random() * all_buildings_array.length - 1);
        let random_floors = Math.floor(Math.random() * 10) + 1;
        buildings_returned.push(new Building(all_buildings_array[random_building], random_floors));
    }

    //sort alphabetically
    buildings_returned.sort((a, b) => {
        let fa = a.name;
        let fb = b.name;

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });


    console.log("create method")
    console.log(all_buildings_array)
    return buildings_returned;
}

function create_building_all() {

    //types of buildings
    const buildings_1 = ["Art Dealer or Gallery", "Auto or Robotics Repair", "Legal Firm", "Data Storage", "Elevated Rail or Road Overpass", "School or College",
        "Garage or Parking Block"];

    let buildings_2_amount = 2;
    const buildings_2 = ["Pharmacy ", "Consumer Electronics", "Religious Building", "Capsule Hotel", "Grocery Store or Hypermarket", "Police Precinct",
        "Government Building"];

    let buildings_3_amount = 3;
    const buildings_3 = ["Storage Units or Warehousing", "Low Rent Housing Project", "Fast Food Franchise"];

    let buildings_all = [];

    console.log("buildings 1");
    console.log(buildings_1)

    buildings_1.forEach(building_name => {
        buildings_all.push(building_name)
    });
    for (let i = 0; i < buildings_2_amount; i++) {
        buildings_2.forEach(building_name => {
            buildings_all.push(building_name)
        });
    }
    for (let i = 0; i < buildings_3_amount; i++) {
        buildings_3.forEach(building_name => {
            buildings_all.push(building_name)
        });
    }
    return buildings_all;
}

function create_table(building_data_array) {

    function generateTableHead(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }

    function generateTable(table, data) {
        for (let element of data) {
            let row = table.insertRow();
            for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
    }

    document.getElementById("buildings_table").innerHTML = "";
    let table = document.querySelector("table");
    let data = Object.keys(building_data_array[0]);
    generateTableHead(table, data);
    generateTable(table, building_data_array);
}



