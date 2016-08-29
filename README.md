
# DOUBLE LINKED LIST [![Build Status](https://travis-ci.org/montaque22/Double-Linked-List.svg?branch=master)](https://travis-ci.org/montaque22/Double-Linked-List)
## Getting Started

This is a simple double linked list. It has some tests but still use discretion.

You will have to create a new object to use it so for browsers...
```bash
var linkedList =  new DoubleLinkedList()
```
and for node...
```bash
var linkedList =  new require('double-linkedlist')();
```
## Classes
<dl>
<dt><a href="#DoubleLinkedList">DoubleLinkedList</a></dt>
<dd></dd>
</dl>
## Typedefs
<dl>
<dt><a href="#Comparitor">Comparitor</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#Callback">Callback</a> ⇒ <code>boolean</code></dt>
<dd></dd>
</dl>
<a name="DoubleLinkedList"></a>
## DoubleLinkedList
**Kind**: global class  
**Author:** Michael Montaque  

* [DoubleLinkedList](#DoubleLinkedList)
  * [new DoubleLinkedList()](#new_DoubleLinkedList_new)
  * [.onChange(func)](#DoubleLinkedList#onChange)
  * [.canUndo()](#DoubleLinkedList#canUndo) ⇒ <code>boolean</code>
  * [.undo()](#DoubleLinkedList#undo)
  * [.clearUndo()](#DoubleLinkedList#clearUndo)
  * [.isEmpty()](#DoubleLinkedList#isEmpty) ⇒ <code>boolean</code>
  * [.getSize()](#DoubleLinkedList#getSize) ⇒ <code>Number</code>
  * [.insertAtStart(data)](#DoubleLinkedList#insertAtStart)
  * [.insertAtEnd(data)](#DoubleLinkedList#insertAtEnd)
  * [.insertAtPosition(data)](#DoubleLinkedList#insertAtPosition)
  * [.deleteAtPosition(position)](#DoubleLinkedList#deleteAtPosition)
  * [.deleteAll()](#DoubleLinkedList#deleteAll)
  * [.removeNode(comparitor, isReversed)](#DoubleLinkedList#removeNode)
  * [.getTail()](#DoubleLinkedList#getTail) ⇒ <code>Object</code>
  * [.getHead()](#DoubleLinkedList#getHead) ⇒ <code>Object</code>
  * [.move(oldIdx, newIdx)](#DoubleLinkedList#move)
  * [.cycle(callback, isReversed)](#DoubleLinkedList#cycle)
  * [.toArray()](#DoubleLinkedList#toArray) ⇒ <code>Array</code>
  * [.findAll(comparitor)](#DoubleLinkedList#findAll)

<a name="new_DoubleLinkedList_new"></a>
### new DoubleLinkedList()
Double Linked List

<a name="DoubleLinkedList#onChange"></a>
### doubleLinkedList.onChange(func)
Will trigger all the functions given to it when objects are added, removed or moved.

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | function to call when a change occurs |

<a name="DoubleLinkedList#canUndo"></a>
### doubleLinkedList.canUndo() ⇒ <code>boolean</code>
determines if there are any more undo left

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
<a name="DoubleLinkedList#undo"></a>
### doubleLinkedList.undo()
will undo the last modifying command

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
<a name="DoubleLinkedList#clearUndo"></a>
### doubleLinkedList.clearUndo()
removes all the undo that the user can perform

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
<a name="DoubleLinkedList#isEmpty"></a>
### doubleLinkedList.isEmpty() ⇒ <code>boolean</code>
is this data list empty?

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
<a name="DoubleLinkedList#getSize"></a>
### doubleLinkedList.getSize() ⇒ <code>Number</code>
Returns the size of this list

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
<a name="DoubleLinkedList#insertAtStart"></a>
### doubleLinkedList.insertAtStart(data)
Inserts data at the end of the list

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
**Summary**: This method is may be faster than the browser&#x27;s native array
in placing an object at the beginning of the array  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> &#124; <code>Array</code> | Data to store into the array |

<a name="DoubleLinkedList#insertAtEnd"></a>
### doubleLinkedList.insertAtEnd(data)
Inserts data at the end of the list

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> &#124; <code>Array</code> | Data to store into the array |

<a name="DoubleLinkedList#insertAtPosition"></a>
### doubleLinkedList.insertAtPosition(data)
Inserts data at the end of the list

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> &#124; <code>Array</code> | Data to store into the array |

<a name="DoubleLinkedList#deleteAtPosition"></a>
### doubleLinkedList.deleteAtPosition(position)
removes a node at the specified position

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>Number</code> | index of the node you want to remove |

<a name="DoubleLinkedList#deleteAll"></a>
### doubleLinkedList.deleteAll()
removes all the nodes

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
<a name="DoubleLinkedList#removeNode"></a>
### doubleLinkedList.removeNode(comparitor, isReversed)
removes a node at the specified position

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  

| Param | Type | Description |
| --- | --- | --- |
| comparitor | <code>[Comparitor](#Comparitor)</code> | function that cycles through each element returning the node and index. The user must return true or false to indicate whether or not the node should be removed. |
| isReversed | <code>Boolean</code> | to cycle through the list in reverse |

**Example**  
```js
list.removeNode(function(node, idx){
     return node.id === 4
},true)
```
<a name="DoubleLinkedList#getTail"></a>
### doubleLinkedList.getTail() ⇒ <code>Object</code>
**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
**Returns**: <code>Object</code> - the node at the end of the list  
<a name="DoubleLinkedList#getHead"></a>
### doubleLinkedList.getHead() ⇒ <code>Object</code>
**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
**Returns**: <code>Object</code> - the node at the start of the list  
<a name="DoubleLinkedList#move"></a>
### doubleLinkedList.move(oldIdx, newIdx)
moves the object

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
**Todo**

- [ ] optimize (Method is brute force)


| Param | Type | Description |
| --- | --- | --- |
| oldIdx | <code>Number</code> | the index of the object you want to move |
| newIdx | <code>Number</code> | the index you want to move the old object to |

<a name="DoubleLinkedList#cycle"></a>
### doubleLinkedList.cycle(callback, isReversed)
cycles through each node and returns it along with the index to the callback
To break free from the cycle the user can return false.

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>[Callback](#Callback)</code> | function that cycles through each element returning the node and index. |
| isReversed | <code>Boolean</code> | to cycle through the list in reverse |

**Example**  
```js
list.cycle(function(node, idx){
     // Do something with the node
})
```
<a name="DoubleLinkedList#toArray"></a>
### doubleLinkedList.toArray() ⇒ <code>Array</code>
returns an array of the data

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
**Returns**: <code>Array</code> - the internal data as an array  
<a name="DoubleLinkedList#findAll"></a>
### doubleLinkedList.findAll(comparitor)
removes a node at the specified position

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  

| Param | Type | Description |
| --- | --- | --- |
| comparitor | <code>[Comparitor](#Comparitor)</code> &#124; <code>Object</code> | function that cycles through each element returning the node and index. The user must return true or false to indicate whether or not the node should be removed. Or it can be an object and the method will find any node that matches the attribute's data |

**Example**  
```js
var array = list.findAll(function(node, idx){
     return node.id === 4
})

var list = list.findAll({id:4})
```
<a name="Comparitor"></a>
## Comparitor ⇒ <code>boolean</code>
**Kind**: global typedef  
**Returns**: <code>boolean</code> - the user should return true any time a condition is met while comparing the node  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> | object in the list |
| idx | <code>Number</code> | index of the object in the list |

<a name="Callback"></a>
## Callback ⇒ <code>boolean</code>
**Kind**: global typedef  
**Returns**: <code>boolean</code> - Optionally the user can return false to break free from the cycle early  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> | object in the list |
| idx | <code>Number</code> | index of the object in the list |

<a name="Node"></a>
## ~Node
todo seal the default methods but allow object to be extensible

**Kind**: inner class  

* [~Node](#Node)
  * [new Node(data, nextNode, previousNode)](#new_Node_new)
  * [.setData(data)](#Node#setData)
  * [.getDataForKey(key)](#Node#getDataForKey)
  * [.appendData(data, key)](#Node#appendData)
  * ~~[.getProtectedData()](#Node#getProtectedData) ⇒~~
  * [.getData()](#Node#getData) ⇒
  * [.hasNext()](#Node#hasNext) ⇒
  * [.hasPrev()](#Node#hasPrev) ⇒
  * [.setNext(obj)](#Node#setNext)
  * [.setPrevious(obj)](#Node#setPrevious)
  * [.getNext()](#Node#getNext) ⇒
  * [.getPrevious()](#Node#getPrevious) ⇒

<a name="new_Node_new"></a>
### new Node(data, nextNode, previousNode)
class that represents the nodes that make up the list. Each of the node are referenced to at most
two other nodes - a previous and a next.


| Param | Description |
| --- | --- |
| data | any object to store |
| nextNode | a node to reference as next |
| previousNode | a node to reference as previous |

<a name="Node#setData"></a>
### node.setData(data)
sets the internal data object

**Kind**: instance method of <code>[Node](#Node)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the information you want to store the node |

<a name="Node#getDataForKey"></a>
### node.getDataForKey(key)
getter for the internal data stored in the node

**Kind**: instance method of <code>[Node](#Node)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | the attribute property name to access the data |

<a name="Node#appendData"></a>
### node.appendData(data, key)
allows you to set data in the internal object.

**Kind**: instance method of <code>[Node](#Node)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the information you want to store the node |
| key | <code>String</code> | the property you want to store the data at |

<a name="Node#getProtectedData"></a>
### ~~node.getProtectedData() ⇒~~
***Deprecated***

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: Object  
<a name="Node#getData"></a>
### node.getData() ⇒
Returns the data that was passed into the object (or added) by the user

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: Object  
<a name="Node#hasNext"></a>
### node.hasNext() ⇒
true if there is another node linked after the node that is caller of this method

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: Boolean  
<a name="Node#hasPrev"></a>
### node.hasPrev() ⇒
true if there is another node linked before the node that is caller of this method

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: Boolean  
<a name="Node#setNext"></a>
### node.setNext(obj)
takes a node object and sets it as the next node in the linked list

**Kind**: instance method of <code>[Node](#Node)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[Node](#Node)</code> | the node object you want to set as next |

<a name="Node#setPrevious"></a>
### node.setPrevious(obj)
takes a node object and sets it as the previous node in the linked list

**Kind**: instance method of <code>[Node](#Node)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>[Node](#Node)</code> | the node object you want to set as previous |

<a name="Node#getNext"></a>
### node.getNext() ⇒
returns the node that is after the node that called this method

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: Node  
<a name="Node#getPrevious"></a>
### node.getPrevious() ⇒
returns the node that is before the node that called this method

**Kind**: instance method of <code>[Node](#Node)</code>  
**Returns**: Node  


## Change Log

### Version 0.0.6
#### Bug Fixes:
* Fixed cycle to require true to be explicitly returned to make the cycle continue.
* Fixed the Move method to properly rearrange the the nodes 

### Version 0.0.7
#### Bug Fixes:
* Fixed issue where adding attributes to the Node object via the dot notation did not propagate properly by restricting 
alterations to the inner node class attributes through only 4 methods: setData, getDataForKey, appendData & 
getProtectedData;


### Version 0.2.0
#### Bug Fix/Added Feature:
* Able to use dot notation to manipulate data on the node objects
* Node base methods are immutable and unenumberable