let tableArray;
let size = 4;


function createTable() {
    let table = document.createElement('table');
    table.className = 'table';
    table.setAttribute('id', 'table');
    document.body.prepend(table);
}

function createRows() {
    tableArray = [];
    var table = document.getElementById('table');
    for (let i = 0; i < size; i++) {
        let tr = document.createElement('tr');
        tr.className = 'table__row';
        let trArray = [];
        for (let j = 0; j < size; j++) {
            let td = document.createElement('td');
            td.className = 'table__cell';
            tr.appendChild(td);
            trArray.push(td);
        }
        tableArray.push(trArray);
        table.appendChild(tr);
        console.log(tableArray);
    }
}

createTable();
createRows();