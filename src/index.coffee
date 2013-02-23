identity = (val) -> val
class PriorityQueue
  Object.defineProperties @::,
    capacity:
      set: (size) ->
        @_capacity = size
        @_maintain()
      
      get: -> @_capacity
    
    queue:
      get: -> @_queue
    
    length:
      get: -> @_queue.length
    
    top: 
      get: -> @_queue[@length-1]
    
    bottom:
      get: -> @_queue[0]
  
  @comparator: (ranker) ->
    (val1, val2) ->
      rank1 = ranker val1
      rank2 = ranker val2
      if      rank1 < rank2 then -1
      else if rank1 > rank2 then 1
      else 0
    
  
  
  constructor: (opts={}) ->
    @_capacity    = opts.capacity ? 0
    @_reversed    = opts.reversed ? false
    @_priority    = opts.priority ? identity
    @_comparator  = opts.comparator ? PriorityQueue.comparator @_priority
    @_discard     = if @_reversed then 'pop' else 'shift'
    @reset()
  
  reset: ->
    @_queue = []
    @_maintain()
    this
  
  
  add: (items...) ->  
    q = @_queue
    index = @_sortedIndex.bind this
    for item in items
      q.splice index(item), 0, item
    @_maintain()
    this
  
  push: @::add
  
  pop: (num) ->
    result = 
      if num? then  @_queue.splice @length - num
      else          @_queue.pop()
    
    @_maintain()
    result
  
  shift: (num) ->
    q = @_queue
    if num?
      result = []
      for i in [0..num-1]
        item = q.shift()
        if item? then result.push item
        else break
    else
      result = q.shift()
    @_maintain()
    result
  
  
  # This method was derived from 
  # [Underscore.js's sortedIndex](http://underscorejs.org/#sortedIndex).
  _sortedIndex: (value) ->
    [low, mid, high] = [0, null, @queue.length]
    q = @_queue
    compare = @_comparator
    while low < high
      mid = (low + high) >>> 1
      if compare(q[mid], value) < 0
        low = mid + 1
      else
        high = mid
    low
  
  _maintain: ->
    capacity = @_capacity
    if (capacity > 0 and (diff = @length - capacity) > 0)
      if diff < 10
        @_queue[@_discard]() for i in [0..diff-1]
      else
        _queue = @slice (if @_reversed then 1 else -1) * capacity
        @_queue = _queue
    null
  

module.exports = PriorityQueue