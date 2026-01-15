'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ComingSoonModal from '@components/ComingSoonModal'

export default function UZAMallPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    router.push('/')
  }

  return (
    <ComingSoonModal
      isOpen={isOpen}
      onClose={handleClose}
      title="UZA Mall"
      description="The future of e-commerce in Africa. A comprehensive marketplace platform connecting buyers and sellers across the continent with seamless transactions and reliable logistics."
      features={[
        {
          title: "Multi-Vendor Marketplace",
          description: "Connect thousands of sellers with millions of buyers across Africa in one unified platform."
        },
        {
          title: "Smart Search & Discovery",
          description: "AI-powered search and recommendation engine to help customers find exactly what they need."
        },
        {
          title: "Secure Payments",
          description: "Multiple payment options including mobile money, cards, and cryptocurrency with bank-level security."
        },
        {
          title: "Integrated Logistics",
          description: "Seamless integration with UZA Logistics for reliable delivery across all African markets."
        },
        {
          title: "Mobile-First Design",
          description: "Optimized for mobile devices with native apps for iOS and Android platforms."
        },
        {
          title: "Seller Tools",
          description: "Comprehensive dashboard for inventory management, analytics, and customer communication."
        }
      ]}
      launchDate="Q2 2025"
      serviceType="marketplace"
    />
  )
}
