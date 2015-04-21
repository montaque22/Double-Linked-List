'use strict'
/**
 @author Michael Montaque <mmontaque@sapient.com>
 @description Handles the Business logic for handling the Goals
 @class Services.ValidationService
 @memberOf Services
 */
angular.module('services')
  .service('DoubleLinkedList',
  function() {
    function DoubleLinkedList(){
      var tail;
      var head;
      var internalArray = [];
      var size = 0;
      var undoCommandList = [];
      var shouldStoreCommand = true;
      var _this = this;

      /*
       HELPER FUNCTIONS: StoreCommand  AND   Wrapper
       Needed to operate the undo functions
       */
      function storeCommand(curriedCommand){
        shouldStoreCommand && undoCommandList.add(curriedCommand);
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
        else if(position === size -1){
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
          for(var i = 1; i < size-1; i++){
            if(i === position){
              node.setNext(current);
              node.setPrevious(current.getPrevious());
              current.getPrevious().setNext(node);

              break;
            }
            current = current.getNext();
          }
        }
        storeCommand(wrapper(deleteAtPosition)(position));
        size++;
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
        canUndo:function(){
          return undoCommandList.length > 0
        },
        undo:function(){
          shouldStoreCommand = false;
          var method = undoCommandList.pop();
          typeof method === 'function' && method();
          shouldStoreCommand = true;
        },

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
          this.insertAtPosition(data,0);

        },

        insertAtEnd:function(data){
          this.insertAtPosition(data,size);
        },

        insertAtPosition:insertAtPosition,

        deleteAtPosition:deleteAtPosition,

        deleteAll:function(){
          var counter = size;
          for(;counter > 0;counter--){
            this.deleteAtPosition(0);
          }
        },

        removeNode:function(comparitor){
          var current =  head;

          for(var i = 0; i < size; i++){
            if(comparitor(current)){
              this.deleteAtPosition(i);
              break;
            }
            current = current.getNext();
          }
        },

        getTail:function(){return tail;},

        getHead:function(){return head;},

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
          for(var i = 0; i< size; i++){
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


    return DoubleLinkedList;
  }
);
