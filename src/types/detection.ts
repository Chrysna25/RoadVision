export interface DetectionResult {
  potholeCount: number
  confidence: number
  processingTime: number
  gpsLocation?: {
    latitude: number
    longitude: number
  }
  severity: "low" | "medium" | "high"
  imageUrl?: string
  detections: Array<{
    id: number
    confidence: number
    bbox: [number, number, number, number] // x1, y1, x2, y2
    severity: "low" | "medium" | "high"
    size: "small" | "medium" | "large"
  }>
}
