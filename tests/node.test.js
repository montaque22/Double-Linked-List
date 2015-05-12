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

    describe('#undo - Add', function(){
        it('Should return null after undo an add', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();
            list.insertAtStart(data);
            list.undo();

            assert.equal(null, list.getHead());
            assert.equal(null, list.getTail());
        })
    })

    describe('#undo - Delete', function(){
        it('Should return an object with id = 1 after deleting it', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();
            list.insertAtStart(data);
            list.deleteAtPosition(0);
            list.undo();

            assert.deepEqual({id:1}, list.getHead().getProtectedData());

        })
    })

    describe('#canUndo - Add', function(){
        it('Should equal true after add', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();

            list.insertAtStart(data);
            assert.equal(true, list.canUndo());

        })
    })

    describe('#canUndo - Move', function(){
        it('Should equal true after move', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();

            list.insertAtStart(data);
            list.insertAtStart({id:2});
            list.clearUndo();
            list.move(1,0);
            assert.equal(true, list.canUndo());
        })
    })

    describe('#canUndo - Delete', function(){
        it('Should equal true after delete but false after delete from an empty list', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();

            list.insertAtStart(data);
            list.clearUndo();
            list.deleteAtPosition(0);
            assert.equal(true, list.canUndo());

            list.undo()

        })
    })

    describe('#canUndo - DeleteAll', function(){
        it('Should equal false after deleting from an empty list but true after deleting from a list with a value', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();

            list.deleteAll();
            assert.equal(false, list.canUndo());

            list.insertAtStart(data);
            list.clearUndo();
            list.deleteAll();
            assert.equal(true, list.canUndo());

        })
    })

    describe('#canUndo - Clear', function(){
        it('Should equal after inserting an item in the list or when executing it on an empty queue', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();

            list.insertAtStart(data);
            list.clearUndo();
            assert.equal(false, list.canUndo());

            list.clearUndo();
            assert.equal(false, list.canUndo());

        })
    })

    describe('#insertAtStart', function(){
        it('Head should return 2 and tail should return 1', function(){
            var list = new DoubleLinkedList();
            list.insertAtStart({id:1});
            list.insertAtStart({id:2});

            assert.equal(2, list.getHead().getDataForKey('id'));
            assert.equal(1, list.getTail().getDataForKey('id'));
        })
    })

    describe('#insertAtEnd', function(){
        it('Head should return 1 and tail should return 2', function(){
            var list = new DoubleLinkedList();
            list.insertAtEnd({id:1});
            list.insertAtEnd({id:2});

            assert.equal(1, list.getHead().getDataForKey('id'));
            assert.equal(2, list.getTail().getDataForKey('id'));
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

            assert.equal(1, node.getDataForKey('id'));
            assert.equal(2, node.getNext().getDataForKey('id'));
            assert.equal(3, node.getNext().getNext().getDataForKey('id'));
        })
    })

    describe('#insertAtPosition - out of bounds', function(){
        it('Should return 1 for the Head and 2 for the tail', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();

            list.insertAtPosition({id:3});
            list.insertAtPosition({id:1},-10);
            list.insertAtPosition({id:2},100);

            var node = list.getHead();

            assert.equal(1, node.getDataForKey('id'));
            assert.equal(3, node.getNext().getDataForKey('id'));
            assert.equal(2, node.getNext().getNext().getDataForKey('id'));
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

            assert.equal(1, node.getDataForKey('id'));
            assert.equal(3, node.getNext().getDataForKey('id'));
            assert.equal(null, node.getNext().getNext());
        })
    })

    describe('#deleteAtPosition - Out of Bounds', function(){
        it('Only the node with id 3 should be left', function(){
            var data =  {id:1};
            var list = new DoubleLinkedList();

            list.insertAtPosition({id:1});
            list.insertAtPosition({id:3},1);
            list.insertAtPosition({id:2},1);

            list.deleteAtPosition(10);
            list.deleteAtPosition(-10);
            var node = list.getHead();

            assert.equal(2, node.getDataForKey('id'));
            assert.equal(1, list.getSize());

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
                return node.getDataForKey('id') === 1;
            });

            var node = list.getHead();

            assert.equal(2, node.getDataForKey('id'));
            assert.equal(3, node.getNext().getDataForKey('id'));
            assert.equal(1, node.getNext().getNext().getDataForKey('id'));
            //assert.equal(3, node.getNext().getNext().getNext().getDataForKey('id'));
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
                return node.getDataForKey('id') === 1;
            },true);

            var node = list.getHead();

            assert.equal(1, node.getDataForKey('id'));
            assert.equal(2, node.getNext().getDataForKey('id'));
            assert.equal(3, node.getNext().getNext().getDataForKey('id'));
            //assert.equal(3, node.getNext().getNext().getNext().getDataForKey('id'));
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

            assert.equal(1, node.getDataForKey('id'));
            assert.equal(1, node.getNext().getDataForKey('id'));
            assert.equal(2, node.getNext().getNext().getDataForKey('id'));
            assert.equal(3, node.getNext().getNext().getNext().getDataForKey('id'));
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
                return node.getDataForKey('id') % 2  === 0 // Find all Even Ids
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

    describe('#cycle - Forward Implicit', function(){
        it('Should Return 1 after stopping at the first point due to implicity return of undefined', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1, name: 'Beth'});
            list.insertAtEnd({id:2, name: 'Joe'});
            list.insertAtEnd({id:3, name: 'sly'});
            list.insertAtEnd({id:4, name: 'kenny'});
            list.insertAtEnd({id:5, name: 'sly'});

          var c1 = 0;

            list.cycle(function(node, idx){
                c1 = node.getDataForKey('id');
            })

            assert.equal(1, c1);

        })
    })

    describe('#cycle - Forward explicit', function(){
        it('Should Return 5 for reaching the top And explicitly passing true', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1, name: 'Beth'});
            list.insertAtEnd({id:2, name: 'Joe'});
            list.insertAtEnd({id:3, name: 'sly'});
            list.insertAtEnd({id:4, name: 'kenny'});
            list.insertAtEnd({id:5, name: 'sly'});

            var c1 = 0;

            list.cycle(function(node, idx){
                c1 = node.getDataForKey('id');
                return true;
            })

            assert.equal(5, c1);

        })
    })

    describe('#cycle - Reversed', function(){
        it('Should Return reaching 0', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1, name: 'Beth'});
            list.insertAtEnd({id:2, name: 'Joe'});
            list.insertAtEnd({id:3, name: 'sly'});
            list.insertAtEnd({id:4, name: 'kenny'});
            list.insertAtEnd({id:5, name: 'sly'});


            var c2 = 0;



            list.cycle(function(node, idx){
                c2 = node.getDataForKey('id')
                return true;
            },true);


            assert.equal(1, c2);

        })
    })

    describe('#cycle - Cancelled', function(){
        it('Should Return 3 after cancelling midway', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1, name: 'Beth'});
            list.insertAtEnd({id:2, name: 'Joe'});
            list.insertAtEnd({id:3, name: 'sly'});
            list.insertAtEnd({id:4, name: 'kenny'});
            list.insertAtEnd({id:5, name: 'sly'});

            var c3 = 0;

            list.cycle(function(node, idx){
                if(idx === 2){
                    c3 = node.getDataForKey('id');
                    return false;
                }
                c3 = 0;
                return true;
            })

            assert.equal(3, c3);
        })
    })

    describe('#Verify Data Change- Dot Notation', function(){
        it('Should Return true when trying to access manually but returns undefined when accessed via getter', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1, name: 'Beth'});
            list.getHead().invisibleData = true;

            assert.equal(true, list.getHead().invisibleData);
            assert.equal(undefined, list.getHead().getDataForKey('invisibleData'));
            assert.equal(undefined, list.getHead().getProtectedData()['invisibleData']);
            assert.equal(undefined, list.toArray()[0]['invisibleData']);
        })
    })

    describe('#Verify Data Change- Setter', function(){
        it('Should Return true when trying to access manually but returns undefined when accessed via getter', function(){

            var list = new DoubleLinkedList();

            list.insertAtEnd({id:1, name: 'Beth'});
            list.getHead().appendData(true,'invisibleData');

            assert.equal(undefined, list.getHead().invisibleData);
            assert.equal(true, list.getHead().getDataForKey('invisibleData'));
            assert.equal(true, list.getHead().getProtectedData()['invisibleData']);
            assert.equal(true, list.toArray()[0]['invisibleData']);
        })
    })
})


