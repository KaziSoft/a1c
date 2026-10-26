import Footer from "./components/Footer";
import Navbar from "./components/navbar/Navbar";
import NavSticky from "./components/NavSticky";
import CircularScrollToTop from "./components/ScrollToTop";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="min-h-screen flex flex-col">
                <Navbar />
                {children}
                <Footer />
                <NavSticky/>
                <CircularScrollToTop/>
            </main>
        </>
    );
}