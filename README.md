
# DOUBLE LINKED LIST
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
**Summary**: Speed indicated that this method was far superior than the native array at with greater data
With 10000 small objects the native array was slightly faster by 3ms
With 100000 small object the double linked list more than 2x&#x27;s faster.
With 1000000 small object the double linked list more than ~100x&#x27;s faster.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> &#124; <code>Array</code> | Data to store into the array |

<a name="DoubleLinkedList#insertAtEnd"></a>
### doubleLinkedList.insertAtEnd(data)
Inserts data at the end of the list

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
**Summary**: Speed indicated that this method was extremely slow in comparison to the native array
With 100000 small objects the native array was 12x&#x27;s faster
With 1000000 small object the native array was 6x&#x27;s faster  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> &#124; <code>Array</code> | Data to store into the array |

<a name="DoubleLinkedList#insertAtPosition"></a>
### doubleLinkedList.insertAtPosition(data)
Inserts data at the end of the list

**Kind**: instance method of <code>[DoubleLinkedList](#DoubleLinkedList)</code>  
**Summary**: Speed indicated that this method was comparable to the native array
With 1000 small objects both were equal
With 100000 small object the double linked list was slightly slower by ms
With 1000000 small object the double linked list was still a little slower by about 30ms  

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
**Kind**: inner class  
<a name="new_Node_new"></a>
### new Node(data, nextNode, previousNode)
class that represents the nodes that make up the list. Each of the node are referenced to at most
two other nodes - a previous and a next.


| Param | Description |
| --- | --- |
| data | any object to store |
| nextNode | a node to reference as next |
| previousNode | a node to reference as previous |


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
