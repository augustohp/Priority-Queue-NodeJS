/**
 * Unit test: Queue (PriorityQueue)
 *
 * @author      Augusto Pascutti
 */
process.env.NODE_ENV = 'testing';

var PriorityQueue = require('../src/PriorityQueue.js'),
 	ASSERT        = require('assert')

console.log("Priority Queue tests ...");

(function() {
	console.log('+ Instance test');
	o = new PriorityQueue();
	ASSERT.ok(o instanceof PriorityQueue);
})();

(function() {
	console.log("+ push(), pop(), shift() and length()");
	q = new PriorityQueue();
	ASSERT.equal(q.length, 0);
	q.push('Douglas Adams', 100);
	q.push('Steve Jobs', 50);
	q.push('Bill Gates', 10);
	q.push('Steve Ballmer', 1);
	q.push('Walt Disney', 60);
	ASSERT.equal(5, q.length);
	ASSERT.equal('Douglas Adams', q.pop()); 	// Most important
	ASSERT.equal('Steve Ballmer', q.shift()); // Less important
	ASSERT.equal(3, q.length);
})();

(function() {
	console.log("+ pop() with the whole queue");
	q = new PriorityQueue();
	q.push('Douglas Adams', 100);
	q.push('Steve Jobs', 50);
	q.push('Bill Gates', 10);
	q.push('Steve Ballmer', 1);
	q.push('Walt Disney', 60);
	ASSERT.equal(q.length, 5);
	ASSERT.equal('Douglas Adams', q.pop());
	ASSERT.equal('Walt Disney', q.pop());
	ASSERT.equal('Steve Jobs', q.pop());
	ASSERT.equal('Bill Gates', q.pop());
	ASSERT.equal('Steve Ballmer', q.pop());
	ASSERT.equal(q.length, 0);
})();

(function() {
	console.log("+ top() and bottom()");
	q = new PriorityQueue();
	q.push('Douglas Adams', 100);
	q.push('Steve Jobs', 50);
	q.push('Bill Gates', 10);
	q.push('Steve Ballmer', 1);
	q.push('Walt Disney', 60);
	ASSERT.equal(5, q.length);
	ASSERT.equal('Douglas Adams', q.top());
	ASSERT.equal('Steve Ballmer', q.bottom());
	ASSERT.equal(5, q.length);
})();

(function() {
	console.log("+ Custom compare function");
	c = function(a,b) {
	    return a.priority - b.priority;
	};
	q = new PriorityQueue(c);
	q.push('Bill Gates', 12);
	q.push('Steve Ballmer', 1);
	q.push('Walt Disney', 60);
	ASSERT.equal('Steve Ballmer', q.pop());
	ASSERT.equal('Bill Gates', q.pop());
	ASSERT.equal('Walt Disney', q.pop());
	ASSERT.equal(0, q.length);
})();

(function() {
	console.log("+ reset()");
	q = new PriorityQueue();
	q.push('Douglas Adams', 100);
	q.push('Steve Jobs', 50);
	q.reset();
	q.push('Bill Gates', 10);
	q.push('Steve Ballmer', 1);
	q.push('Walt Disney', 60);
	ASSERT.equal('Walt Disney', q.pop());
	ASSERT.equal('Bill Gates', q.pop());
	ASSERT.equal('Steve Ballmer', q.pop());
	ASSERT.equal(0, q.length);
})();

(function() {
	console.log('+ Fixed queue size()');
	q = new PriorityQueue();
	q.size(2);
	q.push('Douglas Adams', 100);
	q.push('Steve Jobs', 50);
	q.push('Bill Gates', 10);
	q.push('Steve Ballmer', 1);
	q.push('Walt Disney', 60);
	ASSERT.equal(2, q.length);
	ASSERT.equal('Douglas Adams', q.pop());
	ASSERT.equal('Walt Disney', q.pop());
	ASSERT.equal(0, q.length);
})();

(function() {
	console.log('+ Fixed queue size() set into the constructor');
	q = new PriorityQueue(undefined, 2);
	q.push('Douglas Adams', 100);
	q.push('Steve Jobs', 50);
	q.push('Bill Gates', 10);
	q.push('Steve Ballmer', 1);
	q.push('Walt Disney', 60);
	ASSERT.equal(2, q.length);
	ASSERT.equal('Douglas Adams', q.pop());
	ASSERT.equal('Walt Disney', q.pop());
	ASSERT.equal(0, q.length);
})();

(function() {
    console.log('+ Calling top()/bottom() without any more elements');
    q = new PriorityQueue();
    q.top();
    q.bottom();
})();

(function() {
    console.log('+ Calling pop()/shift() without any more elements');
    q = new PriorityQueue();
    q.pop();
    q.shift();
})();