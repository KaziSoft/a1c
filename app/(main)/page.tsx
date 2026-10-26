import Carousel from "./components/carousel/Carousel";
import FaqSection from "./components/faq-section/FaqSection";
import OurInternet from "./components/our-internet/OurInternet";
import PricingPlans from "./components/pricing/PricingPlan";
import SpecialFeatures from "./components/special-features/SpecialFeatures";

export default function Home() {
    return (
        <>
            <Carousel />
            <PricingPlans />
            <SpecialFeatures />
            <FaqSection />
            <OurInternet/>
        </>
    );
}