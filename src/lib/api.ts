
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export interface DetectionResult {
  confidence: number
  bbox: [number, number, number, number]
  class: string
}

export interface ImageDetectionResponse {
  detections: DetectionResult[]
  total_potholes: number
  image_base64: string
  processing_info: {
    model: string
    confidence_threshold: number
    total_detections: number
  }
}

export class PotholeAPI {
  static async detectImage(file: File): Promise<ImageDetectionResponse> {
    const formData = new FormData()
    formData.append("file", file)

    console.log("[v0] Making API request to:", `${API_BASE_URL}/predict/image`)
    console.log("[v0] File details:", { name: file.name, type: file.type, size: file.size })

    try {
      const response = await fetch(`${API_BASE_URL}/predict/image`, {
        method: "POST",
        body: formData,
        headers: {
          // Let browser set Content-Type with boundary for FormData
        },
      })

      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.log("[v0] Error response body:", errorText)
        throw new Error(`API Error ${response.status}: ${errorText || "Failed to detect potholes in image"}`)
      }

      // Parse JSON response instead of blob
      const jsonData = await response.json()
      console.log("[v0] Received detection data:", { 
        totalPotholes: jsonData.total_potholes, 
        detectionsCount: jsonData.detections?.length 
      })
      return jsonData
    } catch (error) {
      console.error("[v0] API call failed:", error)
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Network error: Unable to connect to the API. Please check your internet connection.")
      }
      throw error
    }
  }

  static async detectVideo(file: File): Promise<{ download_url?: string; error?: string }> {
    const formData = new FormData()
    formData.append("file", file)

    console.log("[v0] Making video API request to:", `${API_BASE_URL}/predict/video`)
    console.log("[v0] Video file details:", { name: file.name, type: file.type, size: file.size })

    try {
      const response = await fetch(`${API_BASE_URL}/predict/video`, {
        method: "POST",
        body: formData,
      })

      console.log("[v0] Video response status:", response.status)
      console.log("[v0] Video response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.log("[v0] Video error response body:", errorText)
        throw new Error(`API Error ${response.status}: ${errorText || "Failed to process video"}`)
      }

      const jsonData = await response.json()
      console.log("[v0] Video response data:", jsonData)
      return jsonData
    } catch (error) {
      console.error("[v0] Video API call failed:", error)
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Network error: Unable to connect to the API. Please check your internet connection.")
      }
      throw error
    }
  }

  static async getProcessedVideo(videoId: string): Promise<Blob> {
    console.log("[v0] Getting processed video for ID:", videoId)

    try {
      const response = await fetch(`${API_BASE_URL}/result/video/${videoId}`, {
        method: "GET",
      })

      console.log("[v0] Processed video response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.log("[v0] Processed video error:", errorText)
        throw new Error(`Failed to get processed video: ${errorText}`)
      }

      const blob = await response.blob()
      console.log("[v0] Received processed video blob:", { type: blob.type, size: blob.size })
      return blob
    } catch (error) {
      console.error("[v0] Get processed video failed:", error)
      throw error
    }
  }

  static async getVideoResult(videoId: string): Promise<Blob> {
    console.log("[v0] Getting video result image for ID:", videoId)

    try {
      const response = await fetch(`${API_BASE_URL}/result/image/${videoId}`, {
        method: "GET",
      })

      console.log("[v0] Video result image response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.log("[v0] Video result image error:", errorText)
        throw new Error(`Failed to get video result image: ${errorText}`)
      }

      const blob = await response.blob()
      console.log("[v0] Received video result image blob:", { type: blob.type, size: blob.size })
      return blob
    } catch (error) {
      console.error("[v0] Get video result image failed:", error)
      throw error
    }
  }

  static async streamVideo(file: File): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${API_BASE_URL}/stream/video`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to start video stream")
    }

    return response.url
  }

  static getCameraStreamUrl(): string {
    return `${API_BASE_URL}/realtime/camera`
  }
}

