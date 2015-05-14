'use strict'
/**
 @author Michael Montaque
 @description Double Linked List
 @class
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
        shouldStoreCommand && undoCommandList.push(curriedCommand);
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
        position = (isNaN(position) || position < 0) ? 0 : position;
        var current = null;
        // There is nothing to remove
        if(size === 0){
            return null;
        }

        // Remove Item from the beginning
        else if(position <= 0){
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
        else if(position >= size - 1){
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

        storeCommand(wrapper(insertAtPosition)(current.getData(),position));
    }

    function insertAtPosition(data, position){
        position = (isNaN(position) || position < 0) ? 0 : position;
        var node = new Node(data);

        // Inserting at the beginning
        if(position <= 0){
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

    function findAll(comparitor){
        var list = [];

        // Search for nodes using the function comparitor that the user passed in
        if(typeof comparitor === 'function'){
            cycle(function(node){
                comparitor(node) && list.push(node);
                return true;
            });
        }

        // Search for nodes using the object to compare against
        else if(typeof comparitor === 'object'){
            list = findAll(function(node){
                var isMatch = true;
                var keys = Object.keys(comparitor);
                for(var i = 0 ;i < keys.length; i++){
                    var key = keys[i];
                    if (node.getDataForKey(key) !== comparitor[key]){
                        isMatch = false;
                        break;
                    }
                }
                return isMatch;
            });
        }
        return list;
    };

    function undo(){
        shouldStoreCommand = false;
        var method = undoCommandList.pop();
        typeof method === 'function' && method();
        shouldStoreCommand = true;
    };

    function cycle(cb, isReversed){
        if(typeof cb === 'function'){
            var current = isReversed ? tail : head;
            var idx = isReversed ? size - 1 : 0;
            var shouldContinue = true;
            while(current && shouldContinue){
                shouldContinue = cb(current, idx);
                current = isReversed ? current.getPrevious() : current.getNext();
                idx += isReversed ? -1 : 1;
            }
        }
    };

    /**
     * @name Node
     * @inner
     * @class
     * todo seal the default methods but allow object to be extensible
     * @description class that represents the nodes that make up the list. Each of the node are referenced to at most
     * two other nodes - a previous and a next.
     * @param data - any object to store
     * @param nextNode - a node to reference as next
     * @param previousNode - a node to reference as previous
     */
    function Node(data, nextNode, previousNode){
        if(typeof data != 'object'){
            throw 'Invalid data. Double Linked List can only take an object as a parameter not a ' + typeof data;
        }

        var prev = previousNode;
        var next = nextNode;
        var node = Object.create(data,{
            getNext:{value:getNext},
            getPrevious:{value:getPrevious},
            setNext:{value:setNext},
            setPrevious:{value:setPrevious},
            hasNext:{value:hasNext},
            hasPrev:{value:hasPrev},
            getProtectedData:{value:getProtectedData},
            getData:{value:getData},
            appendData:{value:appendData},
            getDataForKey:{value:getDataForKey},
            setData:{value:setData}
        });

        /**
         * @function
         * @instance
         * @memberof Node
         * @description sets the internal data object
         * @param {Object} data - the information you want to store the node
         */
        function setData (data){
            for(var property in data){
                this[property] = data[property];
            }
        };

        /**
         * @function
         * @instance
         * @memberof Node
         * @description getter for the internal data stored in the node
         * @param {String} key - the attribute property name to access the data
         */
        function getDataForKey (key){
            return this[key];
        };

        /**
         * @function
         * @instance
         * @memberof Node
         * @description allows you to set data in the internal object.
         * @param {Object} data - the information you want to store the node
         * @param {String} key - the property you want to store the data at
         */
        function appendData (data, key){
            this[key] = data;
        };

        /**
         * @function
         * @instance
         * @memberof Node
         * @deprecated Will be removed by version 1.0.0. (Please use the getData data method instead)
         * @return Object
         */
        function getProtectedData (){
            console.error("Deprecated: Please use getData method instead")
            return getData()
        }

        /**
         * @function
         * @instance
         * @memberof Node
         * @description Returns the data that was passed into the object (or added) by the user
         * @return Object
         */
        function getData (){
            var data = {};
            for(var property in this){
                data[property] = this[property];
            }
            return data;
        }

        /**
         * @function
         * @instance
         * @memberof Node
         * @description true if there is another node linked after the node that is caller of this method
         * @return Boolean
         */
        function hasNext (){
            return getNext() !== undefined;
        }
        /**
         * @function
         * @instance
         * @memberof Node
         * @description true if there is another node linked before the node that is caller of this method
         * @return Boolean
         */
        function hasPrev (){
            return getPrevious() !== undefined;
        }
        /**
         * @function
         * @instance
         * @memberof Node
         * @description takes a node object and sets it as the next node in the linked list
         * @param {Node} obj - the node object you want to set as next
         */
        function setNext (obj){
            next = obj;
        }
        /**
         * @function
         * @instance
         * @memberof Node
         * @description takes a node object and sets it as the previous node in the linked list
         * @param {Node} obj - the node object you want to set as previous
         */
        function setPrevious (obj){
            prev = obj;
        }

        /**
         * @function
         * @instance
         * @memberof Node
         * @description returns the node that is after the node that called this method
         * @return Node
         */
        function getNext (){
            return next;
        };
        /**
         * @function
         * @instance
         * @memberof Node
         * @description returns the node that is before the node that called this method
         * @return Node
         */
        function getPrevious (){
            return prev;
        };

        return node;
    }

    /*
     ------ METHODS AVAILABLE TO THE USER ------
     */
    /**
     * @lends DoubleLinkedList
     */
    return {
        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description Will trigger all the functions given to it when objects are added, removed or moved.
         * @param func {function} function to call when a change occurs
         */
        onChange:function(func){
            typeof func === 'function' && onChangeList.push(func);
        },
        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description determines if there are any more undo left
         * @returns {boolean}
         */
        canUndo:function(){
            return undoCommandList.length > 0
        },
        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description will undo the last modifying command
         */
        undo:undo,

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description removes all the undo that the user can perform
         */
        clearUndo:function(){
            undoCommandList = [];
        },

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description is this data list empty?
         * @returns {boolean}
         */
        isEmpty:function(){
            return head === null || head === undefined;
        },

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description Returns the size of this list
         * @returns {Number}
         */
        getSize:function(){
            return size;
        },

        /**
         * @function
         * @memberof DoubleLinkedList
         * @instance
         * @description Inserts data at the end of the list
         * @summary
         * This method is may be faster than the browser's native array
         * in placing an object at the beginning of the array
         * @param data {Object | Array} - Data to store into the array
         */
        insertAtStart:function(data){
            insertAtPosition(data,0);
        },

        /**
         * @function
         * @memberof DoubleLinkedList
         * @instance
         * @description Inserts data at the end of the list
         * @param data {Object | Array} - Data to store into the array
         */
        insertAtEnd:function(data){
            insertAtPosition(data,size);
        },

        /**
         * @function
         * @memberof DoubleLinkedList
         * @instance
         * @description Inserts data at the end of the list
         * @param data {Object | Array} - Data to store into the array
         */
        insertAtPosition:insertAtPosition,

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description removes a node at the specified position
         * @param position {Number} index of the node you want to remove
         */
        deleteAtPosition:deleteAtPosition,

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description removes all the nodes
         */
        deleteAll:function(){

            if(size){
                var counter = size;
                var undoItAll = [];
                for(;counter > 0;counter--){
                    deleteAtPosition(0);
                    undoItAll.push(undo)
                }
                storeCommand(function(){
                    for(var i = 0; i < undoItAll.length;i++){
                        undoItAll[i]();
                    }
                });
            }

        },

        /**
         *
         * @callback Comparitor
         * @param {Object} node - object in the list
         * @param {Number} idx - index of the object in the list
         * @return {boolean} the user should return true any time a condition is met while comparing the node
         */

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description removes a node at the specified position
         * @param {Comparitor} comparitor - function that cycles through each element
         * returning the node and index. The user must return true or false to indicate whether or not the
         * node should be removed.
         * @param isReversed {Boolean} to cycle through the list in reverse
         * @example
         * list.removeNode(function(node, idx){
         *      return node.id === 4
         * },true)
         */
        removeNode:function(comparitor, isReversed){

            cycle(function(node, idx){
                var shouldStop =  comparitor(node) && (function(){deleteAtPosition(idx); return true;})();
                return !shouldStop;
            }, isReversed);

        },

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @return {Object} the node at the end of the list
         */
        getTail:function(){return tail;},

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @return {Object} the node at the start of the list
         */
        getHead:function(){return head;},


        /**
         * @todo optimize (Method is brute force)
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description moves the object
         * @param {Number} oldIdx - the index of the object you want to move
         * @param {Number} newIdx - the index you want to move the old object to
         */
        move:function(oldIdx, newIdx){

            //if invalid Number, leave
            if(oldIdx === newIdx || oldIdx < 0 || newIdx < 0 || isNaN(oldIdx) || isNaN(newIdx)){
                return
            }

            var current = null;

            cycle(function(node, idx){
                current = node;
                return idx !== oldIdx;
            });

            var data =  current.getData();

            deleteAtPosition(oldIdx);

            insertAtPosition(data,newIdx);

            //need to undo twice because the two previous methods add to the undo queue
            storeCommand(function(){
                undo();
                undo();
            });
        },

        /**
         *
         * @callback Callback
         * @param {Object} node - object in the list
         * @param {Number} idx - index of the object in the list
         * @return {boolean} Optionally the user can return false to break free from the cycle early
         */

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description cycles through each node and returns it along with the index to the callback
         * To break free from the cycle the user can return false.
         * @param {Callback} callback - function that cycles through each element
         * returning the node and index.
         * @param isReversed {Boolean} to cycle through the list in reverse
         * @example
         * list.cycle(function(node, idx){
         *      // Do something with the node
         * })
         */
        cycle:cycle,

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description returns an array of the data
         * @return {Array} the internal data as an array
         */
        toArray:function(){
            var array = [];
            cycle(function(node){
                array.push(node.getData());
                return true;
            });
            return array;
        },

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description removes a node at the specified position
         * @param {Comparitor | Object} comparitor - function that cycles through each element
         * returning the node and index. The user must return true or false to indicate whether or not the
         * node should be removed. Or it can be an object and the method will find any node that matches the attribute's
         * data
         * @example
         * var array = list.findAll(function(node, idx){
         *      return node.id === 4
         * })
         *
         * var list = list.findAll({id:4})
         */
        findAll:findAll
    };
}


if(typeof module !== 'undefined' && this.module !== module && module.exports)
    module.exports = DoubleLinkedList;