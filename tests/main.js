/**
 * Created by mmontaque on 4/28/15.
 */
var list = new DoubleLinkedList();

list.insertAtEnd({id:1})
list.insertAtEnd({id:1, name: 'Beth'});
list.insertAtEnd({id:2, name: 'Joe'});
list.insertAtEnd({id:3, name: 'sly'});
list.insertAtEnd({id:4, name: 'kenny'});
list.insertAtEnd({id:5, name: 'sly'});

list.insertAtPosition({id:1});
list.insertAtPosition({id:3},2);
list.insertAtPosition({id:2},1);

var array = list.findAll({id:1});
console.log(list.toArray())
console.log(array)