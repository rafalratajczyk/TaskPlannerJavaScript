var data = (localStorage.getItem('toDoList')) ? JSON.parse(localStorage.getItem('toDoList')): {
    toDo: [],
    completed: []
};

var doneGlyph = '<span id="done" class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
var removeGlyph = '<span id="remove" class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>';

renderToDoList();

document.getElementById('addItem').addEventListener('click', function () {
    var value = document.getElementById('item').value;

    if (value) {
        addItem(value);
    }

});

document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value;

    if (e.code === 'Enter' && value) {
        addItem(value);
    }
});

function addItem(value) {
    addItemToDo(value);
    document.getElementById('item').value = '';

    data.toDo.push(value);
    dataObjectUdated();

}
function renderToDoList() {
    if (!data.toDo.length && !data.completed.length) return;

    for (var i = 0; i < data.toDo.length; i++) {
        var value = data.toDo[i];
        addItemToDo(value);
    }

    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[j];
        addItemToDo(value,true);
    }
}
function dataObjectUdated() {
    localStorage.setItem('toDoList', JSON.stringify(data));
}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var parentID = parent.id;
    var value = item.innerText;

    if (parentID === 'toDo') {
        data.toDo.splice(data.toDo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }

    dataObjectUdated();

    parent.removeChild(item);
}

function doneItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var parentID = parent.id;
    var value = item.innerText;

    if (parentID === 'toDo') {
        data.toDo.splice(data.toDo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.toDo.push(value);
    }

    dataObjectUdated();

    var target = (parentID === 'toDo') ? document.getElementById('completed') : document.getElementById('toDo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

}

function addItemToDo(text, completed) {
    var list = (completed) ? document.getElementById('completed') : document.getElementById('toDo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeGlyph;

    remove.addEventListener('click', removeItem);

    var done = document.createElement('button');
    done.classList.add('done');
    done.innerHTML = doneGlyph;

    done.addEventListener('click', doneItem);

    buttons.appendChild(remove);
    buttons.appendChild(done);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}