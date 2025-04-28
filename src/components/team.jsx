'use client'
import React from 'react'
import { Twitter, Linkedin, Github } from 'lucide-react'

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
  },
  {
    name: 'Jane Smith',
    role: 'COO',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    socialLinks: {
      twitter: 'https://twitter.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith',
    },
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    socialLinks: {
      twitter: 'https://twitter.com/mikejohnson',
      linkedin: 'https://linkedin.com/in/mikejohnson',
      github: 'https://github.com/mikejohnson',
    },
  },
  {
    name: 'Sarah Brown',
    role: 'Marketing Director',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    socialLinks: {
      twitter: 'https://twitter.com/sarahbrown',
      linkedin: 'https://linkedin.com/in/sarahbrown',
      github: 'https://github.com/sarahbrown',
    },
  },
]

export default function OurTeam() {
  return (
    <div className="bg-white py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {teamMembers.map((person) => (
            <div
              key={person.name}
              className="relative group rounded-lg overflow-hidden shadow-md"
            >
              {/* Social Icons (left hover reveal with padding) */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-center gap-4 px-4 transition-all duration-300 -translate-x-full group-hover:translate-x-0 bg-white/90 z-10">
                <a href={person.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5 text-[#1DA1F2] hover:text-[#1a91da]" />
                </a>
                <a href={person.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-[#0A66C2] hover:text-[#08479d]" />
                </a>
                <a href={person.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 text-[#333] hover:text-[#171515]" />
                </a>
              </div>

              {/* Image */}
              <img
                src={person.imageUrl}
                alt={person.name}
                className="w-full h-72 object-cover"
              />

              {/* Name + Role */}
              <div className="bg-white p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                <p className="text-sm text-indigo-600 mt-1">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
