/**
 * Unit test: Queue (PriorityQueue)
 *
 * @author      Augusto Pascutti
 */
process.env.NODE_ENV = 'testing';

var PriorityQueue = require('../lib/index.js'),
 	  ASSERT        = require('assert'),
 	  priority      = function (obj) { return obj[1] },
 	  comparator    = function (obj1, obj2) { return obj2[1] - obj1[1]; };

console.log("Priority Queue tests ...");

(function() {
	console.log('+ Instance test');
	o = new PriorityQueue();
	ASSERT.ok(o instanceof PriorityQueue);
})();

(function() {
	console.log("+ push(), pop(), shift() and length()");
	q = new PriorityQueue({priority: priority});
	ASSERT.equal(q.length, 0);
	q.push(['Douglas Adams', 100]);
	q.push(['Steve Jobs', 50]);
	q.push(['Bill Gates', 10]);
	q.push(['Steve Ballmer', 1]);
	q.push(['Walt Disney', 60]);
	ASSERT.equal(5, q.length);
	ASSERT.equal('Douglas Adams', q.pop()[0]); 	// Most important
	ASSERT.equal('Steve Ballmer', q.shift()[0]); // Less important
	ASSERT.equal(3, q.length);
})();

(function() {
	console.log("+ pop() with the whole queue");
	q = new PriorityQueue({priority: priority});
	q.push(['Douglas Adams', 100]);
	q.push(['Steve Jobs', 50]);
	q.push(['Bill Gates', 10]);
	q.push(['Steve Ballmer', 1]);
	q.push(['Walt Disney', 60]);
	ASSERT.equal(q.length, 5);
	ASSERT.equal('Douglas Adams', q.pop()[0]);
	ASSERT.equal('Walt Disney', q.pop()[0]);
	ASSERT.equal('Steve Jobs', q.pop()[0]);
	ASSERT.equal('Bill Gates', q.pop()[0]);
	ASSERT.equal('Steve Ballmer', q.pop()[0]);
	ASSERT.equal(q.length, 0);
})();

(function() {
	console.log("+ top and bottom");
	q = new PriorityQueue({priority: priority});
	q.push(['Douglas Adams', 100]);
	q.push(['Steve Jobs', 50]);
	q.push(['Bill Gates', 10]);
	q.push(['Steve Ballmer', 1]);
	q.push(['Walt Disney', 60]);
	ASSERT.equal(5, q.length);
	ASSERT.equal('Douglas Adams', q.top[0]);
	ASSERT.equal('Steve Ballmer', q.bottom[0]);
	ASSERT.equal(5, q.length);
})();

(function() {
	console.log("+ Custom compare function");
	q = new PriorityQueue({comparator: comparator});
	q.push(['Bill Gates', 12]);
	q.push(['Steve Ballmer', 1]);
	q.push(['Walt Disney', 60]);
	ASSERT.equal('Steve Ballmer', q.pop()[0]);
	ASSERT.equal('Bill Gates', q.pop()[0]);
	ASSERT.equal('Walt Disney', q.pop()[0]);
	ASSERT.equal(0, q.length);
})();

(function() {
	console.log("+ reset()");
	q = new PriorityQueue({priority: priority});
	q.push(['Douglas Adams', 100]);
	q.push(['Steve Jobs', 50]);
	q.reset();
	q.push(['Bill Gates', 10]);
	q.push(['Steve Ballmer', 1]);
	q.push(['Walt Disney', 60]);
	ASSERT.equal('Walt Disney', q.pop()[0]);
	ASSERT.equal('Bill Gates', q.pop()[0]);
	ASSERT.equal('Steve Ballmer', q.pop()[0]);
	ASSERT.equal(0, q.length);
})();

(function() {
	console.log('+ Fixed queue size()');
	q = new PriorityQueue({capacity: 2, priority: priority});
	q.push(['Douglas Adams', 100]);
	q.push(['Steve Jobs', 50]);
	q.push(['Bill Gates', 10]);
	q.push(['Steve Ballmer', 1]);
	q.push(['Walt Disney', 60]);
	ASSERT.equal(2, q.length);
	ASSERT.equal('Douglas Adams', q.pop()[0]);
	ASSERT.equal('Walt Disney', q.pop()[0]);
	ASSERT.equal(0, q.length);
})();

(function() {
    console.log('+ Calling top/bottom without any more elements');
    q = new PriorityQueue();
    q.top;
    q.bottom;
})();

(function() {
    console.log('+ Calling pop()/shift() without any more elements');
    q = new PriorityQueue();
    q.pop();
    q.shift();
})();