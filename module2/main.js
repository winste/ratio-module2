let rows = 4;
let columns = 4;
let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];


window.onload = function() {
    createTable();
}


function createTable() {
    let table = document.createElement('table');
    table.className = 'table';
    table.setAttribute('id', 'table');
    document.body.prepend(table);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            
            let cell = document.createElement('div');
            cell.className = 'table__cell';
            table.append(cell);
        }
    }
}



