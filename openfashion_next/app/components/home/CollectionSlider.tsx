import Image from "next/image";

const collections = [
  {
    title: "BROWN T-SHIRT",
    desc: "A comfortable and stylish brown t-shirt made from high-quality cotton fabric.",
    img: "/New10.png",
  },
  {
    title: "SOFT LEATHER JACKETS",
    desc: "Jacket that is made from high-quality leather, providing both style and comfort.",
    img: "/New11.png",
  },
  {
    title: "MAXI DRESS",
    desc: "Dress that is designed to be long and flowing, typically reaching the ankles.",
    img: "/New12.png",
  },
];

export default function CollectionSlider() {
  return (
    <section className="collection-wrapper">
      <section className="collection-slider">
        {collections.map((item, index) => (
          <div className="collection-item" key={index}>
            <div className="collection-image">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="collection-img"
              />
            </div>

            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <a href="#" className="discover">
              TOP PICKED
            </a>
          </div>
        ))}
      </section>
    </section>
  );
}
