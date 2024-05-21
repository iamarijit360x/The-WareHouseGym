import WelcomeScreen from "../components/WelcomeScreen/WelcomeScreen";
import Pricing from "../components/Pricing/Pricing";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
    const { state } = useLocation();

    const { scrolldown } = state || { scrolldown: false };

    useEffect(() => {
        if (scrolldown) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [scrolldown]);

    return (
        <>
            <WelcomeScreen />
            <Pricing />
        </>
    );
}
