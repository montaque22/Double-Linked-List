
# DOUBLE LINKED LIST
## Getting Started

This is a simple double linked list. I use it in my own personal projects but besides
from that it is largely untested so use at your own risk.

You will have to create a new object to use it so for browsers...
```bash
var linkedList =  new DoubleLinkedList()
```
and for node...
```bash
var linkedList =  new require('double-linkedlist')();
```

### Commands
This version of the linked list has some nifty little extras like undo so you can recover any of your actions.
commands include: (Commands with a star * indicates that it can be undone
- canUndo:
    Returns boolean indicating if there is anything in the undo stack
- undo:
    undo what you did
- clearUndo:
    Clears the undo stack
- isEmpty:
    boolean if you stored anything
- getSize:
    returns the number of links
- *insertAtStart:
    Insert link at the start of the list
- *insertAtEnd
    Insert link at the end of the list
- *insertAtPosition
    Insert link anywhere in the list
- *deleteAtPosition
    Deletes link at the specified position
- *deleteAll
    just what you think it is
- removeNode
   given a comparator function, it will delete whatever is set to true
- getTail
    Get the last node
- getHead
    get the first node
- cycle
    Enumerate through the list
- toArray
    Returns an array of the data give
- findAll
    Given a comparator or an object, it will return any node that matches



## License

MIT
