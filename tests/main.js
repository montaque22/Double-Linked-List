/**
 * Created by mmontaque on 4/28/15.
 */
var dll = new DoubleLinkedList();
var arr = [];
var data = "talk";
var max = 1000000;

function insertAtEndSpeed(){
    dll.deleteAll();
    arr = [];

    var start = new Date().getTime();
    for(var i = 0; i < max; i++){
        dll.insertAtEnd(data);
    }

    var elapsed = new Date().getTime() - start;

    console.log("Double Linked List Time: "+ elapsed)

    var start = new Date().getTime();
    for(var i = 0; i < max; i++){
        arr.push(data);
    }
    var elapsed = new Date().getTime() - start;

    console.log("Native Array Time: "+ elapsed)

}

function insertAtStartSpeed(){
    dll.deleteAll();
    arr = [];

    var start = new Date().getTime();
    for(var i = 0; i < max; i++){
        dll.insertAtStart(data);
    }

    var elapsed = new Date().getTime() - start;

    console.log("Double Linked List Time: "+ elapsed)

    var start = new Date().getTime();
    for(var i = 0; i < max; i++){
        arr.unshift(data);
    }
    var elapsed = new Date().getTime() - start;

    console.log("Native Array Time: "+ elapsed)

}


function insertAtPositionSpeed(){
    dll.deleteAll();
    arr = [];
    var mid = Math.ceil(max/2);
    for(var i = 0; i < max; i++){
        dll.insertAtStart(data);
        arr.push(data);
    }


    var start = new Date().getTime();
    dll.insertAtPosition(data,mid)
    var elapsed = new Date().getTime() - start;

    console.log("Double Linked List Time: "+ elapsed);

    var start = new Date().getTime();
    arr.splice(mid, 0, data);
    var elapsed = new Date().getTime() - start;

    console.log("Native Array Time: "+ elapsed)

}

