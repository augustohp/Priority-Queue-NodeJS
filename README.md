## Priority Queue for Node.js

It's a simple implementation of a **priority queue** for NodeJS.

### How do you use it?

```javascript
var PriorityQueue = require('pqueue');
var q = new PriorityQueue(opts);
q.push(1,2,3)
q.pop() // => 3
q.pop(2) // => [1,2]
```

### What are the options?

* `comparator`: A comparator `function(a,b)` that returns -1 if `a<b`, +1 if `a>b` or 0 if ... you know
* `priority`: A function that returns the rank of a given item, used as the basis for comparison. Only used if `comparator` was not provided.
* `capacity`: The maximum number of items the queue will contain. Lower priority items will be discarded, unless ...
* `reversed`: If true, higher priority items will be discarded instead of lower ones (only used when `capacity` is set).

### What are the methods?

* `q.add(item[, items*])` (aliased as `push`)

    Adds one or more items in the queue, keeping it ordered and discarding items if necessary.
    
* `q.pop([n])`
    
    If `n` isn't given, it removes and returns one item from the top of the queue. If `n` is given, remove and 
    return an array of `n` items from the top of the queue.

* `q.shift([n])`
    
    If `n` isn't given, it removes and returns one item from the bottom of the queue. If `n` is given, well ... 
    fill the blanks.

* `q.reset()`
  
    Empty the queue
  
### What are its properties?

* `q.length`: its length (read-only)
* `q.capacity`: its capacity. If set, items will be dropped when the capacity is exceeded.
* `q.queue`: its content (read-only)
* `q.top` and `q.bottom` the top and bottom items in the queue (also read-only)

## License

http://wtfpl.org