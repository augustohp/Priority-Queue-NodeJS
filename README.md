## Priority Queue (NodeJS)

It's a simple implementation of a PriorityQueue for NodeJS. As the code is JavaScript it could be used on the browser without any trouble.

The basic usage is to push() elements and give them a priority to be used into the queue. You can also set a custom compare() function and a limit of elements to be held into the queue.

More examples can be found into the _tests_ folder.
```javascript
queue = new PriorityQueue();
queue.push("Most important note", 99);
queue.push("Important note", 50);
queue.push("Silly notice", 1);

x = queue.top(); // Most important note
x = queue.top(); // Important note
x = queue.top(); // Silly notice
x = queue.top(); // undefined
```