var data = {
    toDo: [],
    completed: []
};

var doneGlyph = '<span id="done" class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
var removeGlyph = '<span id="remove" class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>';

document.getElementById('addItem').addEventListener('click', function () {
    var value = document.getElementById('item').value;

    if (value) {
        addItemToDo(value);
        document.getElementById('item').value = '';

        data.toDo.push(value);
    }

})

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

    console.log(data);

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

    console.log(data);

    var target = (parentID === 'toDo') ? document.getElementById('completed') : document.getElementById('toDo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

}

function addItemToDo(text) {
    var list = document.getElementById('toDo');

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