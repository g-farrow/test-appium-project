interface tourStart {
  description: string
  buttonText: string
}

interface tourSegment {
  title: string
  subtitle: string
  duration: string
}
interface tourEnd {
  description: string
  buttonText: string
}

export interface tour {
  id: string
  title: string
  tourStart: tourStart
  tourSegments: tourSegment[]
  tourEnd: tourEnd
}
