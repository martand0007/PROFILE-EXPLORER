"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Calendar, Loader2 } from "lucide-react"
import MapView from "@/components/map-view"
import { mockProfiles } from "@/lib/mock-data"
import type { Profile } from "@/lib/types"

export default function ProfileDetails() {
  const params = useParams()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        const id = params.id as string
        const foundProfile = mockProfiles.find((p) => p.id === id)

        if (foundProfile) {
          setProfile(foundProfile)
        } else {
          setError("Profile not found")
        }
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="text-gray-500">{error || "Profile not found"}</p>
            <Button className="mt-4" onClick={() => router.push("/")}>
              Return to Profiles
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Profiles
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex justify-center">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-grow">
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-gray-500 mb-4">{profile.title}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        {profile.address.city}, {profile.address.country}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{profile.company}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h2 className="text-lg font-semibold mb-2">About</h2>
                  <p className="text-gray-600">{profile.description}</p>

                  <Separator className="my-4" />

                  <h2 className="text-lg font-semibold mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Experience</h2>

              {profile.experience.map((exp, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{exp.role}</h3>
                      <p className="text-sm text-gray-500">{exp.company}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{exp.period}</span>
                      </div>
                      <p className="text-sm mt-2">{exp.description}</p>
                    </div>
                  </div>
                  {index < profile.experience.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Location</h2>
          <MapView profile={profile} onClose={() => {}} visible={true} />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Address</p>
                  <p>{profile.address.street}</p>
                  <p>
                    {profile.address.city}, {profile.address.zipCode}
                  </p>
                  <p>{profile.address.country}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{profile.email}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{profile.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

