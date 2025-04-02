export interface Address {
  street: string
  city: string
  zipCode: string
  country: string
}

export interface Experience {
  role: string
  company: string
  period: string
  description: string
}

export interface Profile {
  id: string
  name: string
  email: string
  phone: string
  title: string
  company: string
  description: string
  avatar: string
  address: Address
  skills: string[]
  experience: Experience[]
}

