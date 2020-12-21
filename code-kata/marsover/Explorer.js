export default class Explorer {
  init(x, y, dir) {
    this.x = x
    this.y = y
    this.dir = dir
  }
  search(l, w) {
    this.searchLength = l
    this.searchWidth = w
  }
  move(type, distance) {
    const moveMap = {
      N: {
        f: 'fN',
        b: 'bN'
      },
      W: {
        f: 'fW',
        b: 'bW'
      },
      E: {
        f: 'fE',
        b: 'bE'
      },
      S: {
        f: 'fS',
        b: 'bS'
      }
    }
    const moveType = moveMap[this.dir][type]
    if (moveType == 'fN' || moveType == 'bS') this.y += distance
    if (moveType == 'fS' || moveType == 'bN') this.y -= distance
    if (moveType == 'fW' || moveType == 'bE') this.x -= distance
    if (moveType == 'fE' || moveType == 'bW') this.x += distance
  }
  turn(leftOrRight) {
    const dirMap = {
      l: {
        N: 'W',
        W: 'S',
        S: 'E',
        E: 'N'
      },
      r: {
        N: 'E',
        E: 'S',
        S: 'W',
        W: 'N'
      }
    }
    this.dir = dirMap[leftOrRight][this.dir]
  }
  report() {
    return [this.x, this.y]
  }
}
