"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, MapPin, AlertCircle, Loader2 } from "lucide-react"
import type { Profile } from "@/lib/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface MapViewProps {
  profile: Profile | null
  onClose: () => void
  visible: boolean
}

export default function MapView({ profile, onClose, visible }: MapViewProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (!visible || !profile) {
      setMapReady(false)
      return
    }

    // Simulate loading the map
    const loadMap = async () => {
      setLoading(true)
      setError(null)
      setMapReady(false)

      try {
        // Simulate map loading delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setMapReady(true)
      } catch (err) {
        console.error("Error loading map:", err)
        setError("Failed to load the map. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadMap()
  }, [profile, visible])

  return (
    <Card className="h-[400px] md:h-[500px]">
      <CardContent className="p-0 relative h-full">
        {!visible || !profile ? (
          <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
            <div className="text-center p-4">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500">Select a profile to view its location on the map</p>
            </div>
          </div>
        ) : (
          <>
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
              onClick={onClose}
            >
              <X size={18} />
              <span className="sr-only">Close map</span>
            </Button>

            {/* Profile info */}
            <div className="absolute top-2 left-2 z-10 bg-white/90 p-2 rounded shadow-sm max-w-[80%]">
              <h3 className="font-medium text-sm">{profile.name}</h3>
              <p className="text-xs text-gray-500">
                {profile.address.street}, {profile.address.city}, {profile.address.country}
              </p>
            </div>

            {/* Map container */}
            <div className="w-full h-full rounded-lg overflow-hidden">
              {loading && (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-gray-500">Loading map...</p>
                  </div>
                </div>
              )}

              {error && (
                <Alert variant="destructive" className="m-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {mapReady && !loading && !error && (
                <div
                  className="relative w-full h-full bg-blue-50 rounded-lg overflow-hidden"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                >
                  {/* Map marker */}
                  <div
                    className="absolute flex flex-col items-center"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="text-red-500 animate-bounce">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="bg-white px-2 py-1 rounded shadow-md text-xs mt-1">
                      {profile.address.street}, {profile.address.city}
                    </div>
                  </div>

                  {/* Map attribution */}
                  <div className="absolute bottom-1 right-1 text-xs text-gray-500">Map data © Example Maps</div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

