import { FiCalendar, FiShoppingBag, FiGift, FiRefreshCw } from "react-icons/fi";

const features = [
  {
    icon: <FiCalendar />,
    title: "Time Delivery",
    desc: "Delivery service that ensures your packages arrive on time and in good condition.",
  },
  {
    icon: <FiShoppingBag />,
    title: "Shop Your Way",
    desc: "Shop with flexibility and convenience, choosing how and when you want to make your purchases.",
  },
  {
    icon: <FiGift />,
    title: "Special Packaging",
    desc: "Packaging that enhances the unboxing experience and adds a touch of elegance.",
  },
  {
    icon: <FiRefreshCw />,
    title: "Free Global Returns",
    desc: "Easy and hassle-free returns for online purchases, no matter where you are located.",
  },
];

export default function WhyShop() {
  return (
    <section className="why-shop">
      <div className="why-shop-wrapper">
        {features.map((item, index) => (
          <div className="why-item" key={index}>
            <div className="why-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
