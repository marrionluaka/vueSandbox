export interface IMessageData {
  id: number
  isActive: boolean
  profileImagePath: string
  name: string
  location: string
  timeStamp: string
  excerpt: string
}

export interface ISegment {
  name: string
  status: string
}
