"use client"

import { useState, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import ProfileList from "./profile-list"
import MapView from "./map-view"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockProfiles } from "@/lib/mock-data"
import type { Profile } from "@/lib/types"

export default function ProfileExplorer() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [loading, setLoading] = useState(true)

  // Simulate fetching profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProfiles(mockProfiles)
        setFilteredProfiles(mockProfiles)
      } catch (error) {
        console.error("Error fetching profiles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  // Handle search and filtering
  useEffect(() => {
    let result = profiles

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (profile) => profile.name.toLowerCase().includes(query) || profile.description.toLowerCase().includes(query),
      )
    }

    if (locationFilter) {
      result = result.filter((profile) => profile.address.city === locationFilter)
    }

    setFilteredProfiles(result)
  }, [searchQuery, locationFilter, profiles])

  // Get unique cities for filter
  const cities = [...new Set(profiles.map((profile) => profile.address.city))].sort()

  const handleShowOnMap = (profile: Profile) => {
    setSelectedProfile(profile)
    setShowMap(true)
    // Scroll to map if on mobile
    if (window.innerWidth < 768) {
      document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleCloseMap = () => {
    setShowMap(false)
    setSelectedProfile(null)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Profile Explorer</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search profiles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
          <span className="ml-2">Loading profiles...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile List Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Profiles ({filteredProfiles.length})</h2>
            <ProfileList profiles={filteredProfiles} onShowOnMap={handleShowOnMap} />
          </div>

          {/* Map Section */}
          <div id="map-section" className={`${showMap ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Location Map</h2>
              <MapView profile={selectedProfile} onClose={handleCloseMap} visible={showMap} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

