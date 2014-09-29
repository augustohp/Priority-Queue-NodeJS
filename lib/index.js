(function() {
  var PriorityQueue, identity,
    __slice = [].slice;

  identity = function(val) {
    return val;
  };

  PriorityQueue = (function() {

    Object.defineProperties(PriorityQueue.prototype, {
      capacity: {
        set: function(size) {
          this._capacity = size;
          return this._maintain();
        },
        get: function() {
          return this._capacity;
        }
      },
      queue: {
        get: function() {
          return this._queue;
        }
      },
      length: {
        get: function() {
          return this._queue.length;
        }
      },
      top: {
        get: function() {
          return this._queue[this.length - 1];
        }
      },
      bottom: {
        get: function() {
          return this._queue[0];
        }
      }
    });

    PriorityQueue.comparator = function(ranker) {
      return function(val1, val2) {
        var rank1, rank2;
        rank1 = ranker(val1);
        rank2 = ranker(val2);
        if (rank1 < rank2) {
          return -1;
        } else if (rank1 > rank2) {
          return 1;
        } else {
          return 0;
        }
      };
    };

    function PriorityQueue(opts) {
      var _ref, _ref1, _ref2, _ref3;
      if (opts == null) {
        opts = {};
      }
      this._capacity = (_ref = opts.capacity) != null ? _ref : 0;
      this._reversed = (_ref1 = opts.reversed) != null ? _ref1 : false;
      this._priority = (_ref2 = opts.priority) != null ? _ref2 : identity;
      this._comparator = (_ref3 = opts.comparator) != null ? _ref3 : PriorityQueue.comparator(this._priority);
      this._discard = this._reversed ? 'pop' : 'shift';
      this.reset();
    }

    PriorityQueue.prototype.reset = function() {
      this._queue = [];
      this._maintain();
      return this;
    };

    PriorityQueue.prototype.add = function() {
      var index, item, items, q, _i, _len;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      q = this._queue;
      index = this._sortedIndex.bind(this);
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        q.splice(index(item), 0, item);
      }
      this._maintain();
      return this;
    };

    PriorityQueue.prototype.push = PriorityQueue.prototype.add;

    PriorityQueue.prototype.pop = function(num) {
      var result;
      result = num != null ? this._queue.splice(this.length - num) : this._queue.pop();
      this._maintain();
      return result;
    };

    PriorityQueue.prototype.shift = function(num) {
      var i, item, q, result, _i, _ref;
      q = this._queue;
      if (num != null) {
        result = [];
        for (i = _i = 0, _ref = num - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          item = q.shift();
          if (item != null) {
            result.push(item);
          } else {
            break;
          }
        }
      } else {
        result = q.shift();
      }
      this._maintain();
      return result;
    };

    PriorityQueue.prototype._sortedIndex = function(value) {
      var compare, high, low, mid, q, _ref;
      _ref = [0, null, this.queue.length], low = _ref[0], mid = _ref[1], high = _ref[2];
      q = this._queue;
      compare = this._comparator;
      while (low < high) {
        mid = (low + high) >>> 1;
        if (compare(q[mid], value) < 0) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return low;
    };

    PriorityQueue.prototype._maintain = function() {
      var capacity, diff, i, _i, _queue, _ref;
      capacity = this._capacity;
      if (capacity > 0 && (diff = this.length - capacity) > 0) {
        if (diff < 10) {
          for (i = _i = 0, _ref = diff - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            this._queue[this._discard]();
          }
        } else {
          _queue = this.slice((this._reversed ? 1 : -1) * capacity);
          this._queue = _queue;
        }
      }
      return null;
    };

    return PriorityQueue;

  })();

  module.exports = PriorityQueue;

}).call(this);
