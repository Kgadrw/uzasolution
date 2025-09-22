import ComingSoon from '@components/ComingSoon'

export default function ComingSoonPage() {
  return (
    <ComingSoon
      title="UZA Solutions"
      description="We're building something amazing. Stay tuned for our upcoming platforms and services."
      features={[
        {
          title: "UZA Mall",
          description: "A comprehensive e-commerce marketplace connecting buyers and sellers across Africa."
        },
        {
          title: "UZA Logistics", 
          description: "End-to-end logistics management with real-time tracking and optimization."
        },
        {
          title: "UZA Cloud",
          description: "Cloud infrastructure and services tailored for African businesses."
        }
      ]}
      launchDate="Q2 2025"
      serviceType="platforms"
    />
  )
}
