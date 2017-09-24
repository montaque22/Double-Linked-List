# DOUBLE LINKED LIST [![Build Status](https://travis-ci.org/montaque22/Double-Linked-List.svg?branch=master)](https://travis-ci.org/montaque22/Double-Linked-List)

## Breaking Change - Migrating to V1.0.0
Version 1.0.0 changed the way you instantiate for node. 
See the getting started section for more on how to get started.

## Getting Started

This is a simple double linked list. It has some tests but still use discretion.
You will have to create a new object to use it so for browsers...
```bash
var linkedList =  new DoubleLinkedList()
```
and for node...
```bash
var DoubleLinkedList = require('double-linkedlist').DoubleLinkedList;
var linkedList =  new DoubleLinkedList();
```

## Changelog

- Updated documentation
- Updated build. Now includes minified version.
- Converted the build to UMD. As a result the instantiation process for node has changed.
- Cycle method has been removed. Please use Psychic method instead.
### Table of Contents

-   [DoubleLinkedList](#doublelinkedlist)
    -   [onChange](#onchange)
    -   [canUndo](#canundo)
    -   [undo](#undo)
    -   [clearUndo](#clearundo)
    -   [isEmpty](#isempty)
    -   [getSize](#getsize)
    -   [insertAtStart](#insertatstart)
    -   [insertAtEnd](#insertatend)
    -   [insertAtPosition](#insertatposition)
    -   [deleteAtPosition](#deleteatposition)
    -   [deleteAll](#deleteall)
    -   [removeNode](#removenode)
    -   [getTail](#gettail)
    -   [getHead](#gethead)
    -   [move](#move)
    -   [psychic](#psychic)
    -   [psychic](#psychic-1)
    -   [toArray](#toarray)
    -   [findAll](#findall)
-   [Psychic-Callback](#psychic-callback)
-   [Comparitor](#comparitor)
-   [Callback](#callback)
-   [LinkNode](#linknode)
    -   [getNext](#getnext)
    -   [getPrevious](#getprevious)
    -   [setNext](#setnext)
    -   [setPrevious](#setprevious)
    -   [hasNext](#hasnext)
    -   [hasPrev](#hasprev)
    -   [getProtectedData](#getprotecteddata)
    -   [appendData](#appenddata)
    -   [getDataForKey](#getdataforkey)
    -   [setData](#setdata)

## DoubleLinkedList

Double Linked List

**Meta**

-   **author**: Michael Montaque

### onChange

Will trigger all the functions given to it when objects are added, removed or moved.

**Parameters**

-   `func` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** called when a change occurs

### canUndo

determines if there are any more undo left

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### undo

will undo the last modifying command

### clearUndo

removes all the undo that the user can perform

### isEmpty

is this data list empty?

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### getSize

Returns the size of this list

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### insertAtStart

Inserts data at the start of the list

**Parameters**

-   `data` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** Data to store into the array

### insertAtEnd

Inserts data at the end of the list

**Parameters**

-   `data` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** Data to store into the array

### insertAtPosition

Inserts data at a specified position the list

**Parameters**

-   `data` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** Data to store into the array

### deleteAtPosition

removes a node at the specified position

**Parameters**

-   `position` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** index of the node you want to remove

### deleteAll

removes all the nodes

### removeNode

removes a node at the specified position

**Parameters**

-   `comparitor` **[Comparitor](#comparitor)** function that cycles through each element
    returning the node and index. The user must return true or false to indicate whether or not the
    node should be removed.
-   `isReversed`  {Boolean} to cycle through the list in reverse

**Examples**

```javascript
list.removeNode(function(node, idx){
     return node.id === 4
},true)
```

### getTail

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** the node at the end of the list

### getHead

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** the node at the start of the list

### move

moves the object

**Parameters**

-   `oldIdx` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the index of the object you want to move
-   `newIdx` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the index you want to move the old object to

### psychic

cycles through each node and returns it along with the previous node, the next node
and the index to the callback. To break free from the cycle the user can return false or let it run to the end

**Parameters**

-   `callback` **[Psychic-Callback](#psychic-callback)** function that cycles through each element
    returning the node and index.
-   `isReversed` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** to cycle through the list in reverse

**Examples**

```javascript
list.psychic(function(currentNode, previousNode, nextNode, idx){
     // Do something with the node
     // return true to keep going or false to stop
})
```

### psychic

cycles through each node and returns it along with the index to the callback
To break free from the cycle the user can return false.

**Parameters**

-   `callback` **[Callback](#callback)** function that cycles through each element
    returning the node and index.
-   `isReversed`  {Boolean} to cycle through the list in reverse

**Examples**

```javascript
list.cycle(function(node, idx){
     // Do something with the node
})
```

**Meta**

-   **deprecated**: Will be removed by version 1.0.0. (Please use the psychic method instead)


### toArray

returns an array of the data

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** the internal data as an array

### findAll

removes a node at the specified position

**Parameters**

-   `comparitor` **([Comparitor](#comparitor) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** function that cycles through each element
    returning the node and index. The user must return true or false to indicate whether or not the
    node should be removed. Or it can be an object and the method will find any node that matches the attribute's
    data

**Examples**

```javascript
var array = list.findAll(function(node, idx){
     return node.id === 4
})

var list = list.findAll({id:4})
```

## Psychic-Callback

Type: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)

**Parameters**

-   `currentNode` **[LinkNode](#linknode)** The current node object in the list
-   `previousNode` **[LinkNode](#linknode)** The previous node object in the list
-   `nextNode` **[LinkNode](#linknode)** The next node object in the list
-   `idx` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** index of the object in the list

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Optionally the user can return false to break free from the cycle early

## Comparitor

Type: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)

**Parameters**

-   `node` **[LinkNode](#linknode)** object in the list
-   `idx` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** index of the object in the list

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** the user should return true any time a condition is met while comparing the node

## Callback

Type: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)

**Parameters**

-   `node` **[LinkNode](#linknode)** object in the list
-   `idx` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** index of the object in the list

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Optionally the user can return false to break free from the cycle early

## LinkNode

class that represents the nodes that make up the list. Each of the node are referenced to at most
two other nodes - a previous and a next.

**Parameters**

-   `data`  any object to store
-   `nextNode`  a node to reference as next
-   `previousNode`  a node to reference as previous

### getNext

returns the node that is after the node that called this method

Returns **any** LinkNode

### getPrevious

returns the node that is before the node that called this method

Returns **any** LinkNode

### setNext

takes a node object and sets it as the next node in the linked list

**Parameters**

-   `obj` **[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)** the node object you want to set as next

### setPrevious

takes a node object and sets it as the previous node in the linked list

**Parameters**

-   `obj` **[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)** the node object you want to set as previous

### hasNext

true if there is another node linked after the node that is caller of this method

Returns **any** Boolean

### hasPrev

true if there is another node linked before the node that is caller of this method

Returns **any** Boolean

### getProtectedData

Returns **any** Object

**Meta**

-   **deprecated**: Will be removed by version 1.0.0. (Please use the getData data method instead)


### appendData

allows you to set data in the internal object.

**Parameters**

-   `data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** the information you want to store the node
-   `key` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the property you want to store the data at

### getDataForKey

getter for the internal data stored in the node

**Parameters**

-   `key` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the attribute property name to access the data

### setData

sets the internal data object

**Parameters**

-   `data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** the information you want to store the node
