"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus, Search, Trash2, Edit } from "lucide-react"
import { mockProfiles } from "@/lib/mock-data"
import type { Profile } from "@/lib/types"
import ProfileForm from "@/components/profile-form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setProfiles(mockProfiles)
      } catch (error) {
        console.error("Error fetching profiles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateProfile = (profile: Omit<Profile, "id">) => {
    // In a real app, this would be an API call
    const newProfile = {
      ...profile,
      id: `p${profiles.length + 1}`,
    } as Profile

    setProfiles([...profiles, newProfile])
    setIsCreating(false)
  }

  const handleUpdateProfile = (updatedProfile: Profile) => {
    // In a real app, this would be an API call
    const updatedProfiles = profiles.map((profile) => (profile.id === updatedProfile.id ? updatedProfile : profile))

    setProfiles(updatedProfiles)
    setIsEditing(false)
    setSelectedProfile(null)
  }

  const handleDeleteProfile = (id: string) => {
    // In a real app, this would be an API call
    const updatedProfiles = profiles.filter((profile) => profile.id !== id)
    setProfiles(updatedProfiles)
    setIsDeleting(false)
    setSelectedProfile(null)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="profiles">
        <TabsList className="mb-6">
          <TabsTrigger value="profiles">Profiles</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <CardTitle>Manage Profiles</CardTitle>
              <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogTrigger asChild>
                  <Button className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Profile</DialogTitle>
                    <DialogDescription>Fill in the details to create a new profile.</DialogDescription>
                  </DialogHeader>
                  <ProfileForm onSubmit={handleCreateProfile} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search profiles..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="animate-spin h-8 w-8 text-primary" />
                  <span className="ml-2">Loading profiles...</span>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProfiles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                            No profiles found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProfiles.map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell>
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={profile.avatar} alt={profile.name} />
                                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{profile.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{profile.email}</TableCell>
                            <TableCell>
                              {profile.address.city}, {profile.address.country}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedProfile(profile)
                                    setIsEditing(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedProfile(profile)
                                    setIsDeleting(true)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Edit Dialog */}
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Make changes to the profile information.</DialogDescription>
                  </DialogHeader>
                  {selectedProfile && <ProfileForm profile={selectedProfile} onSubmit={handleUpdateProfile} />}
                </DialogContent>
              </Dialog>

              {/* Delete Confirmation Dialog */}
              <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this profile? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-4 mt-4">
                    <Button variant="outline" onClick={() => setIsDeleting(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => selectedProfile && handleDeleteProfile(selectedProfile.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Admin settings will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

