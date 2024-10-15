import Hero from "../components/Hero"
import QuickLinks from "../components/QuickLinks"
import BankBanner from "../components/BankBanner.jsx"
import Offers from "../components/OffersBanner.jsx"
import hdfcBanner from "../assets/offers-assets/hdfcbanner.webp"
export default function Home() {
  return (
    <div>
      <Hero/>
      <QuickLinks/>
      <BankBanner/>
      <Offers/>
      <div className="flex items-center w-[70%] mx-auto mt-10 ">
      <img src={hdfcBanner} alt="hdfc Banner" />
      </div>
    </div>
  )
}
