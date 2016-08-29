'use strict';
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


    function normalizePosition(position){

        if(isNaN(position) || position < 0){
            return 0
        }else if(position >= size){
            return size - 1
        }
        return position;
    }
    /**
     * uses recursion(top down) to find the node by index
     * @param node
     * @param indexPositionOfNode
     * @returns {*}
     */
    function recursiveFindByIndex(node, indexPositionOfNode){


        // Base Case
        if(indexPositionOfNode <= 0){
            return node;
        }

        // Error Case
        else if(!node){
            return null
        }

        // Error Case
        else if(!node.hasNext() && indexPositionOfNode > 0){
            return null;
        }

        // Error Case
        else if(indexPositionOfNode >= size){
            throw new Error('The index exceeds the size of the list')
        }

        // Recursive Call
        return recursiveFindByIndex(node.getNext(), --indexPositionOfNode)
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

        // remove the only node
        else if(size === 1){
            // temporarily save the node (doesn't matter heads or tails)
            current = head;

            // set both head and tail to null
            head = tail = null;

        }else{

            // make sure the position is valid
            position = normalizePosition(position);

            // find the node at the position
            current = recursiveFindByIndex(head, position);

            // Get the left and right side (prev and next) of the current node
            var leftSide    = current.getPrevious();
            var rightSide   = current.getNext();

            // If the left node exist, set it to the right (it is ok if the right doesn't exist)
            leftSide && leftSide.setNext(rightSide);

            // If the right node exist, set it to the left (it is ok if the left doesn't exist)
            rightSide && rightSide.setPrevious(leftSide);

            // Handle fringe cases
            if(position === 0){
                // if the position is at the beginning, update the head to be the right node (since the left doesn't exist)
                head = rightSide;
            }else if(position === size - 1){
                // if the position is at the end, update the tail to be the left node (since the right doesn't exist)
                tail = leftSide
            }

        }

        size--;

        storeCommand(wrapper(insertAtPosition)(current.getData(),position));

        return current;
    }


    /**
     * Inserts a new node (with data) at the specified position
     * @param data
     * @param position
     */
    function insertAtPosition(data, position){
        position = (isNaN(position) || position < 0) ? 0 : position;

        // Create the new node
        var node = new Node(data);

        if(size === 0){
            head = tail = node;
        }
        else {

            // If the position is greater than the size of the list then append the node to the end
            var isAtEnd = position >= size;

            // Find the node at the given index (If it is greater than the index it will return the last on in the array)
            var current = recursiveFindByIndex(head, (isAtEnd) ? size - 1 : position);

            // Get the left node from the current node (if at the end then the left node is the current node
            var leftNode    = (isAtEnd) ? current : current.getPrevious();

            // get the next node
            var rightNode   = (isAtEnd) ? null : current;

            // left node will point its next to the node while...
            leftNode    && leftNode.setNext(node);

            // the right node will point its previous to the node
            rightNode   && rightNode.setPrevious(node);

            node.setPrevious(leftNode).setNext(rightNode);

            tail = (isAtEnd) ? node : tail;

            head = (position <=0 ) ? node : head;

        }


        // Store the opposite command for the undo
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

    function psychic(cb, isReversed){
        if(typeof cb === 'function'){
            var current = isReversed ? tail : head;
            var idx = isReversed ? size - 1 : 0;
            var shouldContinue = true;
            while(current && shouldContinue){
                shouldContinue = cb(current, current.getPrevious(), current.getNext(), idx);
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
        var node = Object.create(Object.prototype);
        Object.defineProperties(node,{
            getNext:{value:getNext, enumerable:false, writable:false, configurable:false},
            getPrevious:{value:getPrevious, enumerable:false, writable:false, configurable:false},
            setNext:{value: setNext, enumerable:false, writable:false, configurable:false},
            setPrevious:{value: setPrevious, enumerable:false, writable:false, configurable:false},
            hasNext:{value:hasNext, enumerable:false, writable:false, configurable:false},
            hasPrev:{value:hasPrev, enumerable:false, writable:false, configurable:false},
            getProtectedData:{value:getProtectedData, enumerable:false, writable:false, configurable:false},
            getData:{value:getData, enumerable:false, writable:false, configurable:false},
            appendData:{value: appendData, enumerable:false, writable:false, configurable:false},
            getDataForKey:{value:getDataForKey, enumerable:false, writable:false, configurable:false},
            setData:{value: setData, enumerable:false, writable:false, configurable:false}
        })


        function NodeMethods(){

        }
         setData(data);
            /**
         * @function
         * @instance
         * @memberof Node
         * @description sets the internal data object
         * @param {Object} data - the information you want to store the node
         */
        function setData (data){
            for(var property in data){
                node[property] = data[property];
            }
            return node;
        };

        /**
         * @function
         * @instance
         * @memberof Node
         * @description getter for the internal data stored in the node
         * @param {String} key - the attribute property name to access the data
         */
        function getDataForKey (key){
            return node[key];
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
            node[key] = data;
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
            for(var property in node){
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
            return node;
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
            return node;
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
         * @description Inserts data at the start of the list
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
         * @description Inserts data at a specified position the list
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

            var current = recursiveFindByIndex(head, oldIdx);

            var data =  current.getData();

            deleteAtPosition(oldIdx);

            insertAtPosition(data, newIdx);

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
         * @deprecated Will be removed by version 1.0.0. (Please use the psychic method instead)
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
         *
         * @callback Psychic-Callback
         * @param {Object} currentNode - The current node object in the list
         * @param {Object} previousNode - The previous node object in the list
         * @param {Object} nextNode - The next node object in the list
         * @param {Number} idx - index of the object in the list
         * @return {boolean} Optionally the user can return false to break free from the cycle early
         */

        /**
         * @function
         * @instance
         * @memberof DoubleLinkedList
         * @description cycles through each node and returns it along with the previous node, the next node
         * and the index to the callback. To break free from the cycle the user can return false or let it run to the end
         * @param {Callback} callback - function that cycles through each element
         * returning the node and index.
         * @param isReversed {Boolean} to cycle through the list in reverse
         * @example
         * list.psychic(function(currentNode, previousNode, nextNode, idx){
         *      // Do something with the node
         *      // return true to keep going or false to stop
         * })
         */
        psychic:psychic,

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