import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('../components/hero'))
const AboutUs = dynamic(() => import('../components/about'))
const Projects = dynamic(() => import('../components/projects'))
const Why = dynamic(() => import('../components/why'))
const TrustedCo = dynamic(() => import('../components/trusted'))
const Make = dynamic(() => import('../components/make'))
const Testimonials = dynamic(() => import('../components/testimonials'))
const Partners = dynamic(() => import('../components/partners'))
{/*const Portfolio = dynamic(() => import('../components/portfolio'))*/}
const Footer = dynamic(() => import('../components/footer'))

const Page = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Projects />
      <Why />

      <Make />
      <TrustedCo />
      <Testimonials />
      <Partners />
     { /*<Portfolio />*/}
      <Footer />
    </div>
  )
}

export default Page