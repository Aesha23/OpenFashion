import NewCollections from "@/app/components/home/NewCollection";
import CollectionSlider from "@/app/components/home/CollectionSlider";
import WhyShop from "@/app/components/home/WhyShop";
import NewArrivals from "@/app/components/home/NewArrivals";


export default function HomePage() {
  return (
    <>
      <section className="colllection-section">
        <NewCollections />
        <CollectionSlider />
      </section>
      <WhyShop />
      <NewArrivals />
    </>
  );
}
