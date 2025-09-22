import ComingSoon from '@components/ComingSoon'

export default function UZALogisticsPage() {
  return (
    <ComingSoon
      title="UZA Logistics"
      description="Revolutionizing supply chain management across Africa. End-to-end logistics solutions with real-time tracking, optimization, and seamless integration for businesses of all sizes."
      features={[
        {
          title: "Real-Time Tracking",
          description: "Track shipments from origin to destination with live updates and predictive delivery times."
        },
        {
          title: "Route Optimization",
          description: "AI-powered route planning to minimize costs and delivery times across complex African logistics networks."
        },
        {
          title: "Multi-Modal Transport",
          description: "Seamless coordination of road, rail, air, and sea freight for optimal cost and speed."
        },
        {
          title: "Warehouse Management",
          description: "Complete warehouse operations management with inventory tracking and automated fulfillment."
        },
        {
          title: "Customs & Compliance",
          description: "Automated customs clearance and compliance management for cross-border shipments."
        },
        {
          title: "API Integration",
          description: "Easy integration with existing systems through comprehensive APIs and webhooks."
        }
      ]}
      launchDate="Q3 2025"
      serviceType="logistics"
    />
  )
}
