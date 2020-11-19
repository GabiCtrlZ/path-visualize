/* eslint-disable no-param-reassign */

const defaultCf = (v1, v2) => {
  if (!v1) return true
  if (!v2) return true
  return v1 >= v2
}

export default (initValue, cf = defaultCf) => ({
  queue: [initValue],
  length: 1,
  cf,
  insert: (self, value) => {
    const { queue, length } = self
    queue.push(value)
    if (!length) {
      self.length += 1
      return
    }
    let index = length
    let shouldBobble = true

    while (shouldBobble) {
      const element = queue[index]
      const parent = queue[Math.floor((index - 1) / 2)]
      if (self.cf(parent, element)) {
        // element is in place finish algo
        shouldBobble = false
      }
      else {
        // parent is bigger
        queue[index] = parent
        queue[Math.floor((index - 1) / 2)] = element
        index = Math.floor((index - 1) / 2)
      }
    }

    self.length += 1
  },
  pop: (self) => {
    const { queue, length } = self
    if (length === 1) {
      self.length += -1
      return queue.pop()
    }
    const returnValue = queue.shift()
    queue.unshift(queue.pop())
    let index = 0
    let shouldBobble = true

    while (shouldBobble) {
      const element = queue[index]
      const left = queue[(index * 2) + 1]
      const right = queue[(index * 2) + 2]
      if (self.cf(element, right) && self.cf(element, left)) {
        // element is in place finish algo
        shouldBobble = false
      }
      else if (self.cf(left, right) && self.cf(left, element)) {
        // left side is bigger
        queue[index] = left
        queue[(index * 2) + 1] = element
        index = (index * 2) + 1
      }
      else if (self.cf(right, left) && self.cf(right, element)) {
        // right side is bigger
        queue[index] = right
        queue[(index * 2) + 2] = element
        index = (index * 2) + 2
      }
    }

    self.length += -1

    return returnValue
  },
})
