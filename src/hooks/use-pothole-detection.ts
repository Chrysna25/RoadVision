"use client"

import { useState, useRef } from "react"
import { PotholeAPI, type ImageDetectionResponse } from "@/lib/api"
import { API_BASE_URL } from "@/config"

export function usePotholeDetection() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{
    processedImageUrl?: string
    processedVideoUrl?: string // Added processed video URL for streaming
    downloadUrl?: string // Added downloadUrl for video download functionality
    processingTime: number
    hasDetections: boolean
    fileType: "image" | "video"
    videoId?: string
    detections: Array<{
      id: number
      confidence: number
      bbox: [number, number, number, number]
    }>
    totalPotholes: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setResults(null)
    setError(null)
  }

  const startDetection = async () => {
    if (!uploadedFile) return

    const isVideo = uploadedFile.type.startsWith("video/")
    const isImage = uploadedFile.type.startsWith("image/")

    if (!isVideo && !isImage) {
      setError("Unsupported file format. Please upload an image or video file.")
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate progress updates (slower for videos)
      const progressInterval = setInterval(
        () => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + Math.random() * (isVideo ? 5 : 15)
          })
        },
        isVideo ? 600 : 200,
      )

      const startTime = Date.now()

      let processedImageUrl: string
      let processedVideoUrl: string | undefined
      let downloadUrl: string | undefined
      let videoId: string | undefined
      let detectedPotholes: Array<{
        id: number
        confidence: number
        bbox: [number, number, number, number]
      }> = []

      if (isVideo) {
        console.log("[v0] Processing video file...")

        const videoResponse = await PotholeAPI.detectVideo(uploadedFile)

        if (videoResponse.error) {
          throw new Error(videoResponse.error)
        }

        if (videoResponse.download_url) {
          downloadUrl = `${API_BASE_URL}${videoResponse.download_url}`
        } else {
          throw new Error("No download URL received from video processing")
        }

        // For display purposes, create a placeholder image
        processedImageUrl = "/video-processed-successfully.png"
      } else {
        console.log("[v0] Processing image file...")

        const imageResponse: ImageDetectionResponse = await PotholeAPI.detectImage(uploadedFile)

        // Convert base64 to displayable URL
        const base64Image = `data:image/jpeg;base64,${imageResponse.image_base64}`
        processedImageUrl = base64Image

        // Convert API detections to our format
        detectedPotholes = imageResponse.detections.map((detection, index) => ({
          id: index + 1,
          confidence: detection.confidence / 100, // Convert percentage to decimal if needed
          bbox: detection.bbox,
        }))

        console.log("[v0] Processed detections:", detectedPotholes.length)
      }

      clearInterval(progressInterval)

      const processingTime = (Date.now() - startTime) / 1000

      setProgress(100)
      setResults({
        processedImageUrl,
        processedVideoUrl,
        downloadUrl,
        processingTime: Math.round(processingTime * 10) / 10,
        hasDetections: detectedPotholes.length > 0,
        fileType: isVideo ? "video" : "image",
        videoId,
        detections: detectedPotholes,
        totalPotholes: detectedPotholes.length,
      })

      setIsProcessing(false)
    } catch (err) {
      console.error("Detection error:", err)
      let errorMessage = "An error occurred during detection"

      if (err instanceof Error) {
        errorMessage = err.message
      }

      setError(errorMessage)
      setIsProcessing(false)
      setProgress(0)
    }
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setPreviewUrl("")
    setResults(null)
    setProgress(0)
    setIsProcessing(false)
    setIsVideoPlaying(false)
    setError(null)

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    if (results?.processedImageUrl) {
      URL.revokeObjectURL(results.processedImageUrl)
    }
    if (results?.processedVideoUrl) {
      URL.revokeObjectURL(results.processedVideoUrl)
    }

    // Stop video if playing
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  return {
    uploadedFile,
    previewUrl,
    isProcessing,
    progress,
    results,
    error,
    isVideoPlaying,
    videoRef,
    handleFileUpload,
    startDetection,
    resetUpload,
    toggleVideoPlayback,
  }
}
