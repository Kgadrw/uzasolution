import ComingSoon from '@components/ComingSoon'

export default function UZACloudPage() {
  return (
    <ComingSoon
      title="UZA Cloud"
      description="Cloud infrastructure and services designed specifically for African businesses. Scalable, secure, and cost-effective cloud solutions with local data centers and compliance."
      features={[
        {
          title: "Local Data Centers",
          description: "Data centers across Africa ensuring low latency and data sovereignty compliance."
        },
        {
          title: "Scalable Infrastructure",
          description: "Auto-scaling cloud resources that grow with your business needs and budget."
        },
        {
          title: "Security & Compliance",
          description: "Enterprise-grade security with compliance to African data protection regulations."
        },
        {
          title: "Cost Optimization",
          description: "Intelligent resource management to minimize cloud costs while maintaining performance."
        },
        {
          title: "Developer Tools",
          description: "Comprehensive SDKs, APIs, and development tools for seamless cloud integration."
        },
        {
          title: "24/7 Support",
          description: "Round-the-clock technical support with local expertise and multilingual assistance."
        }
      ]}
      launchDate="Q4 2025"
      serviceType="cloud"
    />
  )
}
