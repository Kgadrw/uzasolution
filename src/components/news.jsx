import { motion } from 'framer-motion'; // Ensure this import is present
import Link from 'next/link'; // Import the Link component from Next.js

export default function ImageWithTextSection() {
  // Actual News from Igihe Newspaper about your company
  const news = [
    {
      id: 1,
      title: "Company X Featured in Igihe Newspaper: Uza Bulk Reaches 20 Million",
      description: "Our product Uza Bulk has reached a significant milestone, featured in Igihe. Read more about its success.",
      imageUrl: "/blog1.jpeg", // Replace with an image related to the article
      link: "https://igihe.com/serivisi/article/ibicuruzwa-byo-ku-rubuga-nyarwanda-uza-bulk-byageze-kuri-miliyoni-20"
    },
    {
      id: 2,
      title: "Innovative Solutions by Uzabulk Highlighted in Igihe",
      description: "Igihe covered our innovative solutions for local manufacturing challenges and how we're transforming the industry.",
      imageUrl: "/blog2.jpeg", // Replace with an image related to the article
      link: "https://en.igihe.com/spip.php?page=mv2_article&id_article=54022"
    }
  ];

  return (
    <section className="py-20 bg-[#f4f4f4]">
      <div className="container mx-auto text-center px-4 sm:px-8"> {/* Added padding for mobile */}
        <h2 className="text-3xl font-bold text-[#213348] mb-8 font-[Poppins]">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center">
          {news.map(item => (
            <motion.div
              key={item.id}
              className="relative bg-white shadow-lg overflow-hidden group" // Independent hover for each item
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: item.id * 0.2 }}
            >
              {/* Link wrapper */}
              <Link href={item.link} passHref className="relative block"> {/* Wrap the whole item in a clickable link */}
                
                {/* News banner at the top left with no opacity */}
                <div className="absolute top-4 left-4 bg-[#FBAF43] text-white text-xs font-bold px-3 py-1 rounded-md z-10">
                  News
                </div>

                {/* Image with responsive size and centered */}
                <div className="w-full h-64 sm:h-80 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"  // Ensures the image covers the container without distortion
                  />
                </div>
                
                {/* Semi-transparent black overlay on the image */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
                
                {/* Title: always visible, hidden on hover */}
                <div className="absolute bottom-4 left-4 text-white font-[Poppins] group-hover:opacity-0 transition-opacity duration-300 z-20">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                </div>

                {/* Hover effect for description: show description when hovered */}
                <div className="absolute bottom-4 left-4 text-white font-[Poppins] opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 transition-all duration-300 z-20">
                  <p className="text-xs">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
