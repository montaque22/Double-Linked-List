/**
 * Created by mmontaque on 4/28/15.
 */
var DoubleLinkedList = require('double-linkedlist');
var assert = require("assert");


describe('Double Linked List', function(){

    describe('#getSize', function(){
        it('Should say return 1 after inserting 1 object', function(){
            var data =  {id:1};
            var insertAtStart = new DoubleLinkedList();
            insertAtStart.insertAtStart(data);


            var insertAtEnd = new DoubleLinkedList();
            insertAtEnd.insertAtEnd(data);

            var insertAtPosition = new DoubleLinkedList();
            insertAtPosition.insertAtPosition(data)

            assert.equal(1, insertAtStart.getSize());
            assert.equal(1, insertAtEnd.getSize());
            assert.equal(1, insertAtPosition.getSize());

        })
    })

    describe('#undo', function(){
        it('Should return null after undo an add', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();
            list.insertAtStart(data);
            list.undo();

            assert.equal(null, list.getHead());
            assert.equal(null, list.getTail());
        })
    })

    describe('#insertAtStart', function(){
        it('Head should return 2 and tail should return 1', function(){
            var list = new DoubleLinkedList();
            list.insertAtStart({id:1});
            list.insertAtStart({id:2});

            assert.equal(2, list.getHead().id);
            assert.equal(1, list.getTail().id);
        })
    })

    describe('#insertAtEnd', function(){
        it('Head should return 1 and tail should return 2', function(){
            var list = new DoubleLinkedList();
            list.insertAtEnd({id:1});
            list.insertAtEnd({id:2});

            assert.equal(1, list.getHead().id);
            assert.equal(2, list.getTail().id);
        })
    })

    describe('#insertAtPosition', function(){
        it('First node should be 1 next node should be 2 the last node should be 3', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();

            list.insertAtPosition({id:1});
            list.insertAtPosition({id:3},2);
            list.insertAtPosition({id:2},1);

            var node = list.getHead();

            assert.equal(1, node.id);
            assert.equal(2, node.getNext().id);
            assert.equal(3, node.getNext().getNext().id);
        })
    })

    describe('#deleteAtPosition', function(){
        it('First node should be 1 and the last node should be 3', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();

            list.insertAtPosition({id:1});
            list.insertAtPosition({id:3},2);
            list.insertAtPosition({id:2},1);

            list.deleteAtPosition(1);
            var node = list.getHead();

            assert.equal(1, node.id);
            assert.equal(3, node.getNext().id);
            assert.equal(null, node.getNext().getNext());
        })
    })

    describe('#deleteAll', function(){
        it('Both Head and Tail should be null and the size should be 0', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();

            list.insertAtPosition({id:1});
            list.insertAtPosition({id:3},2);
            list.insertAtPosition({id:2},1);

            list.deleteAll();

            var head = list.getHead();
            var tail = list.getTail();
            var size = list.getSize();

            assert.equal(null, head);
            assert.equal(null, tail);
            assert.equal(0, size);
        })
    })

    describe('#removeNode - Forward', function(){
        it('The first node should be 2 the next node should be 3 and the last node should be 1', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1});
            list.insertAtEnd({id:2});
            list.insertAtEnd({id:3});
            list.insertAtEnd({id:1});

            list.removeNode(function(node){
                return node.id === 1;
            });

            var node = list.getHead();

            assert.equal(2, node.id);
            assert.equal(3, node.getNext().id);
            assert.equal(1, node.getNext().getNext().id);
            //assert.equal(3, node.getNext().getNext().getNext().id);
        })
    })

    describe('#removeNode - Reversed', function(){
        it('Should delete process starting from the end leaving us with 1, 2, 3', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1});
            list.insertAtEnd({id:2});
            list.insertAtEnd({id:3});
            list.insertAtEnd({id:1});

            list.removeNode(function(node){
                return node.id === 1;
            },true);

            var node = list.getHead();

            assert.equal(1, node.id);
            assert.equal(2, node.getNext().id);
            assert.equal(3, node.getNext().getNext().id);
            //assert.equal(3, node.getNext().getNext().getNext().id);
        })
    })

    describe('#move', function(){
        it('Should move the node at index 3 to index 1', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1});
            list.insertAtEnd({id:2});
            list.insertAtEnd({id:3});
            list.insertAtEnd({id:1});

            list.move(3,1);

            var node = list.getHead();

            assert.equal(1, node.id);
            assert.equal(1, node.getNext().id);
            assert.equal(2, node.getNext().getNext().id);
            assert.equal(3, node.getNext().getNext().getNext().id);
        })
    })

    describe('#toArray', function(){
        it('Should Return [{id:1},{id:2},{id:3}]', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1});
            list.insertAtEnd({id:2});
            list.insertAtEnd({id:3});
            //list.insertAtEnd({id:1});

            var array = list.toArray();


            assert.deepEqual([{id:1},{id:2},{id:3}], array);

        })
    })

    describe('#findAll - comparator', function(){
        it('Should Return objects with even Id numbers', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1, name: 'Beth'});
            list.insertAtEnd({id:2, name: 'Joe'});
            list.insertAtEnd({id:3, name: 'sly'});
            list.insertAtEnd({id:4, name: 'kenny'});

            var array = list.findAll(function(node){
                return node.id % 2  === 0 // Find all Even Ids
            });


            assert.deepEqual({id:2, name: 'Joe'}, array[0].getProtectedData());
            assert.deepEqual({id:4, name: 'kenny'}, array[1].getProtectedData());

        })
    })

    describe('#findAll - equality', function(){
        it('Should Return {id:3, name: "sly"}', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1, name: 'Beth'});
            list.insertAtEnd({id:2, name: 'Joe'});
            list.insertAtEnd({id:3, name: 'sly'});
            list.insertAtEnd({id:4, name: 'kenny'});
            list.insertAtEnd({id:5, name: 'sly'});

            var array = list.findAll({name:'sly'});


            assert.deepEqual({id:3, name: 'sly'}, array[0].getProtectedData());
            assert.deepEqual({id:5, name: 'sly'}, array[1].getProtectedData());

        })
    })
})


