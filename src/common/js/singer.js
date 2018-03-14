class Singer {
  constructor ({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

export default function createSinger (options) {
  if (typeof options !== 'object') return
  return new Singer({
    id: options.id,
    name: options.name
  })
}
