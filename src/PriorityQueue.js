var _ = require('underscore');

/**
 * Priority queue class.
 *
 * @class
 * @param 	Function[optional] 	c	Compare function to be used
 * @param	integer[optional]	m	Max number of elements to hold
 * @author	Augusto Pascutti
 */
var PriorityQueue = function(c, m) { this.init(c, m) };
PriorityQueue.prototype = {
  _queue: [],
  _compare: undefined,
  _size: 0,

  /**
   * Priority queue class constructor.
   *
   * @class
   * @param 	Function[optional] 	compare_function	Compare function to be used
   * @param	integer[optional]	maximum_size		Max number of elements to hold
   */
  init: function(compare_function, maximum_size, reversed) {
    this._compare = compare_function || undefined;
    this._size = maximum_size || 0 ;
    this._reversed = reversed == null ? false : reversed;
    this._expelfun = reversed ? 'pop' : 'shift';
    this.reset();
  },

  /**
   * Pushes something to the priority queue.
   *
   * @param 	mixed 		value
   * @param 	integer		priority
   * @return 	void
   */
  push: function(value, priority) {
    if (value === null or typeof value === 'undefined') return;
    var q = this._queue;
    var idx = priority ?  _.sortedIndex(q, priority) :
                          _.sortedIndex(q, value, this._compare);
    q.splice(idx, 0, value);
    this._maintain();
  },

  /**
   * Removes the most important item and return its value. 
   *
   * @return mixed
   */
  pop: function() {
    item = this._queue.pop();
    this._maintain();
    return (item) ? item : undefined;
  },

  /**
   * Returns most important item value from this queue, without removing it.
   *
   * @return mixed
   */
  top: function() {
    item = _.last(this._queue);
    return (item) ? item : undefined;
  },

  /**
   * Removes the less important item and return its value.
   *
   * @return mixed
   */
  shift: function() {
    item = this._queue.shift();
    this._maintain();
    return (item) ? item : undefined;
  },
  
  /**
   * Remove and return a slice array starting from the bottom up to the provided 
   * index (when positive) or starting from some provided negative index from
   * the top up to the top.
   *
   * @return mixed
   */
  slice: function(index) { 
    var newList = [], item, i;
    if (index > 0)
      for (i=0; i<index; i++) {
        item = this._queue.shift();
        if (item != null) newList.push(item);
        else break;
      }
    else if (index < 0) {
      newList = this._queue.splice(this.length+index);
    } else return [];
    this._maintain();
    return newList;
  },

  /**
   * Returns the less important item value, without removing it.
   *
   * @return mixed
   */
  bottom: function() {
    item = _.first(this._queue);
    return (item) ? item : undefined;
  },
  
  /**
   * Returns the ordered queue as an Array.
   *
   * @return Array
   */
  getArray: function() {
    return this._queue || [];
  },

  /**
   * Resets the queue.
   *
   * @return void
   */
  reset: function() {
    this._queue = [];
    this._maintain();
  },

  /**
   * Defines a fixed size to the queue.
   * Zero for no limit and any other number to set it as the highest number
   * of items allowed in this queue.
   *
   * @param 	integer		i
   * @return 	void
   */
  size: function(i) {
    this._size = i;
  },

  /**
   * Keeps the size of the queue by removing the less important item of it and length
   * information atribute.
     *
   * @return void
   */
  _maintain: function() {
    var diff, i;
    if (this._size > 0 && (diff = this._queue.length - this._size) > 0) {
      if (diff < 10) {
        for (i=0, i<diff, i++) this._queue[this._expelfun]();
      } else {
        var _queue = this.slice((this._reversed ? 1 : -1) * this._size);
        this._queue = _queue;
      }
    }
    this.length = this._queue.length;
  },
};

module.exports = PriorityQueue;