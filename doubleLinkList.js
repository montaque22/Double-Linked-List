'use strict'
/**
 @author Michael Montaque
 @description Double Linked List
 Ability to store data in a double linked list.
 Some notable features  includes:
 - undo: undo adding or deleting nodes
 - toArray: returns data in each node as an array
 - cycle: enumerates through all the nodes
 - findAll: finds all the node matching the comparator or object
 */

function DoubleLinkedList(){
    var tail;
    var head;
    var size = 0;
    var undoCommandList = [];
    var shouldStoreCommand = true;
    var _this = this;
    var onChangeList = [];

    /*
     HELPER FUNCTIONS: StoreCommand  AND   Wrapper
     Needed to operate the undo functions
     */
    function storeCommand(curriedCommand){
        shouldStoreCommand && undoCommandList.add(curriedCommand);
        for(var i = 0;i < onChangeList.length;i++){
            onChangeList[i]();
        }
    }

    function wrapper(method){
        return function(){
            var args =  arguments;
            return function(){
                method.apply(_this, args)
            }
        }
    }


    /*
     CORE INSERT REMOVE FUNCTIONS: DeleteAtPosition  AND  InsertAtPosition
     These need to be in the main object scope as they refer to each other.
     */
    function deleteAtPosition(position){
        var current = null;
        // There is nothing to remove
        if(size === 0){
            return null;
        }

        // Remove Item from the beginning
        else if(position === 0){
            current = head;
            head = head.getNext();
            head && head.setPrevious(null);
            current.setNext(null);

            if(size === 1){
                tail = head;
            }
            size--;
        }

        // Remove item from the end
        else if(position === size - 1){
            current = tail;
            tail =  tail.getPrevious();
            tail && tail.setNext(null);
            current.setPrevious(null);
            size--;
        }

        // remove item from the middle
        else {
            var current = head;
            for(var i = 0; i< size;i++){
                if(i === position){
                    current.getPrevious().setNext(current.getNext())
                    current.getNext().setPrevious(current.getPrevious());
                    current.setNext(null);
                    current.setPrevious(null);
                    size--;
                    break;
                }
                current = current.getNext();
            }
        }

        storeCommand(wrapper(insertAtPosition)(current.getProtectedData(),position));
    }

    function insertAtPosition(data, position){

        var node = new Node(data);

        // Inserting at the beginning
        if(position === 0){
            if(!head){
                tail = head = node;
            }else{
                head.setPrevious(node);
                node.setNext(head);
                head = node;
            }
        }

        // Inserting at the End
        else if(position >= size){
            if(!head){
                tail = head = node;
            }else{
                node.setPrevious(tail);
                tail.setNext(node);
                tail = node;
            }
        }

        // Inserting Anywhere in the middle
        else{
            var current = head;
            for(var i = 0; i < size; i++){
                if(i === position){
                    /*
                     newNode -->current

                     Prev <---> current
                     */
                    node.setNext(current);
                    /*
                     Prev <-- newNode --> current

                     Prev <---> current
                     */
                    node.setPrevious(current.getPrevious());

                    /*
                     Prev <--> newNode --> current

                     Prev <--- current
                     */
                    current.getPrevious().setNext(node);
                    /*
                     Prev <--> newNode <--> current
                     */
                    current.setPrevious(node);

                    break;
                }
                current = current.getNext();
            }
        }
        storeCommand(wrapper(deleteAtPosition)(position));
        size++;
    }

    function undo(){
        shouldStoreCommand = false;
        var method = undoCommandList.pop();
        typeof method === 'function' && method();
        shouldStoreCommand = true;
    }


    /*
     NODE CLASS: These will be chain together
     */
    function Node(data, nextNode, previousNode){
        var prev;
        var next;
        var _this = this;

        this.setData = function(data){
            if(data){
                Object.keys(data, function(key, val){
                    _this[key] = val;
                });
            }
            _this.getProtectedData = function(){
                return data;
            }
        };
        this.hasNext = function(){
            return _this.getNext() !== undefined;
        }
        this.hasPrev = function(){
            return _this.getPrevious() !== undefined;
        }
        this.setNext = function(obj){
            next = obj;
        }
        this.setPrevious = function(obj){
            prev = obj;
        }

        this.getNext = function(){
            return next;
        };
        this.getPrevious = function(){
            return prev;
        };

        this.setData(data);
        this.setNext(nextNode);
        this.setPrevious(previousNode);

    }

    /*
     ------ METHODS AVAILABLE TO THE USER ------
     */
    return {
        onChange:function(func){
            typeof func === 'function' && onChangeList.add(func);
        },
        canUndo:function(){
            return undoCommandList.length > 0
        },
        undo:undo,

        clearUndo:function(){
            undoCommandList = [];
        },

        isEmpty:function(){
            return head === null || head === undefined;
        },

        getSize:function(){
            return size;
        },

        insertAtStart:function(data){
            insertAtPosition(data,0);

        },

        insertAtEnd:function(data){
            insertAtPosition(data,size);
        },

        insertAtPosition:insertAtPosition,

        deleteAtPosition:deleteAtPosition,

        deleteAll:function(){
            var counter = size;
            var undoItAll = [];
            for(;counter > 0;counter--){
                deleteAtPosition(0);
                undoItAll.add(undo)
            }
            storeCommand(function(){
                for(var i = 0; i < undoItAll.length;i++){
                    undoItAll[i]();
                }
            });
        },

        removeNode:function(comparitor, isReversed){
            var current = isReversed ? tail : head;

            if(isReversed){
                for(var i = size - 1 ; i >= 0; i--){
                    if(comparitor(current)){
                        deleteAtPosition(i);
                        break;
                    }
                    current = current.getPrevious();
                }
            }else{
                for(var i = 0; i < size; i++){
                    if(comparitor(current)){
                        deleteAtPosition(i);
                        break;
                    }
                    current = current.getNext();
                }
            }
        },

        getTail:function(){return tail;},

        getHead:function(){return head;},

        move:function(oldIdx, newIdx){
            //if invalid Number, leave
            if(oldIdx === newIdx || oldIdx < 0 || newIdx < 0 || isNaN(oldIdx) || isNaN(newIdx)){
                return
            }
            var counter = 0;
            var current = head;

            for(var counter = 0;counter < oldIdx;counter++){
                current = current.getNext();
            }
            var data =  current.getProtectedData();
            deleteAtPosition(oldIdx);
            insertAtPosition(data,newIdx);

            //need to undo twice because the two previous methods add to the undo queue
            storeCommand(function(){
                undo();
                undo();
            });
        },

        cycle:function(cb){
            var current = head;
            for(var i = 0; i< size; i++){
                cb(current, i);
                current = current.getNext();
            }
        },

        toArray:function(){
            var array = [];
            var current = head;
            while(current){
                array.push(current.getProtectedData());
                current = current.getNext();
            }
            return array;
        },

        findAll:function(comparitor){
            var list = [];

            // Search for nodes using the function comparitor that the user passed in
            if(typeof comparitor === 'function'){
                this.cycle(function(node){
                    comparitor(node) && list.push(node);
                });
            }

            // Search for nodes using the object to compare against
            else if(typeof comparitor === 'object'){
                list = this.findAll(function(node){
                    var isMatch = true;
                    var keys = Object.keys(comparitor);
                    for(var i = 0 ;i < keys.length; i++){
                        var key = keys[i];
                        if (node[key] !== comparitor[key]){
                            isMatch = false;
                            break;
                        }
                    }
                    return isMatch;
                });
            }
            return list;
        }
    };
}


if(typeof module !== 'undefined' && this.module !== module && module.exports)
    module.exports = DoubleLinkedList;