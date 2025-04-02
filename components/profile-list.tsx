"use client"
import type { Profile } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Info } from "lucide-react"
import Link from "next/link"

interface ProfileListProps {
  profiles: Profile[]
  onShowOnMap: (profile: Profile) => void
}

export default function ProfileList({ profiles, onShowOnMap }: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No profiles found. Try adjusting your search.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} onShowOnMap={onShowOnMap} />
      ))}
    </div>
  )
}

function ProfileCard({ profile, onShowOnMap }: { profile: Profile; onShowOnMap: (profile: Profile) => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 p-4 flex justify-center items-center bg-gray-50">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="sm:w-2/3 p-4">
            <h3 className="text-lg font-semibold mb-1">{profile.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin size={14} className="mr-1" />
              <span>
                {profile.address.city}, {profile.address.country}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{profile.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0 sm:pt-4 border-t">
        <Button variant="outline" size="sm" onClick={() => onShowOnMap(profile)} className="flex items-center">
          <MapPin size={16} className="mr-1" />
          <span>Show on Map</span>
        </Button>
        <Link href={`/profile/${profile.id}`} passHref>
          <Button variant="ghost" size="sm" className="flex items-center">
            <Info size={16} className="mr-1" />
            <span>Details</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

