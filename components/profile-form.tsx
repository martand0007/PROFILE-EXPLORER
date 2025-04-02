"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Profile } from "@/lib/types"

interface ProfileFormProps {
  profile?: Profile
  onSubmit: (profile: Profile | Omit<Profile, "id">) => void
}

export default function ProfileForm({ profile, onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState<Partial<Profile>>(
    profile || {
      name: "",
      email: "",
      phone: "",
      title: "",
      company: "",
      description: "",
      avatar: "/placeholder.svg?height=128&width=128",
      address: {
        street: "",
        city: "",
        zipCode: "",
        country: "",
      },
      skills: [],
      experience: [],
    },
  )

  const [skillInput, setSkillInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof Profile],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleAddSkill = () => {
    if (skillInput.trim() && formData.skills) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      })
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    if (formData.skills) {
      const updatedSkills = [...formData.skills]
      updatedSkills.splice(index, 1)
      setFormData({
        ...formData,
        skills: updatedSkills,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData as Profile)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name || ""} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email || ""} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone || ""} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" name="title" value={formData.title || ""} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" value={formData.company || ""} onChange={handleChange} required />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="address.street">Street Address</Label>
            <Input
              id="address.street"
              name="address.street"
              value={formData.address?.street || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="address.city">City</Label>
            <Input
              id="address.city"
              name="address.city"
              value={formData.address?.city || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="address.zipCode">Zip Code</Label>
            <Input
              id="address.zipCode"
              name="address.zipCode"
              value={formData.address?.zipCode || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="address.country">Country</Label>
            <Input
              id="address.country"
              name="address.country"
              value={formData.address?.country || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              name="avatar"
              value={formData.avatar || ""}
              onChange={handleChange}
              placeholder="URL to profile image"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div>
        <Label>Skills</Label>
        <div className="flex gap-2 mb-2">
          <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill" />
          <Button type="button" onClick={handleAddSkill}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.skills?.map((skill, index) => (
            <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
              {skill}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1"
                onClick={() => handleRemoveSkill(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit">{profile ? "Update Profile" : "Create Profile"}</Button>
      </div>
    </form>
  )
}

