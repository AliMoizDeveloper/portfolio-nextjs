import Navbar from "@/components/Navbar"
import ProfileHero from "@/components/ProfileHero"
import PortfolioSection from "@/components/PortfolioSection"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <section id="home" className="pt-20 pb-5 px-4">
          <div className="container mx-auto max-w-6xl">
            <ProfileHero />
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className=" px-4 bg-muted/30 ">
          <div className="container mx-auto max-w-6xl">
            <PortfolioSection />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="pb-5 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Contact</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {"Ready to bring your mobile app idea to life? Let's discuss your project and create something amazing together."}
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}