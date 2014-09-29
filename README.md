# Priority Queue (NodeJS) [![Build Status](https://travis-ci.org/augustohp/Priority-Queue-NodeJS.svg)](https://travis-ci.org/augustohp/Priority-Queue-NodeJS)

It's a simple implementation of a **priority queue** for Node.js. It uses binary search to keep items ordered as
they are inserted. By doing so, its performances are much more stable and attractive than the manual method of pushing
items into an array and using `#sort()` continuously.

## How do you use it?

```javascript
var biggestNumber = new PriorityQueue();
biggestNumber.push(1,2,3)
biggestNumber.pop() // 3 (greater integers are more important)
biggestNumber.pop(2) // [1,2] (the next "2" more important items)

var bestAuthors = new PriorityQueue();
bestAuthors.push(["Douglas Adams", 100]);
bestAuthors.push(["Isaac Azimov", 90]);
bestAuthors.push(["J. K. Rowling", 1]);
bestAuthors.pop(); // ["Douglas Adams", 100]
```

## What are the options?

* `comparator`: A comparator `function(a,b)` that returns -1 if `a<b`, +1 if `a>b` or 0 if ... you know
* `priority`: A function that returns the rank of a given item, used as the basis for comparison. Only used if `comparator` was not provided.
* `capacity`: The maximum number of items the queue will contain. Lower priority items will be discarded, unless ...
* `reversed`: If true, higher priority items will be discarded instead of lower ones (only used when `capacity` is set).

## What are the methods?

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

## What are its properties?

* `q.length`: its length (read-only)
* `q.capacity`: its capacity. If set, items will be dropped when the capacity is exceeded.
* `q.queue`: its content (read-only)
* `q.top` and `q.bottom` the top and bottom items in the queue (also read-only)

## License

http://wtfpl.org

