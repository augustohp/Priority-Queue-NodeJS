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
    
  
  
  constructor: (opts) ->
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
  
  
  push: (items...) ->  
    q = @_queue
    index = @_sortedIndex.bind this
    for item in items
      q.splice index(item), 0, item
    @_maintain()
    this
  
  pop: ->
    item = @_queue.pop()
    @_maintain()
    item
  
  shift: ->
    item = @_queue.shift()
    @_maintain()
    item
  
  
  slice: (index) ->
    q = @_queue
    if index > 0
      newList = []
      for i in [0..index]
        item = q.shift()
        if item? then newList.push item
        else break
        
    else if index < 0
      newList = q.splice @length + index
      
    else return []
    
    @_maintain()
    newList
  
  
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