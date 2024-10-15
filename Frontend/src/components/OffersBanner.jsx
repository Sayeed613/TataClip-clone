import { offerTitleAndBanner } from '../assets/assets';

export default function Offers() {
  return (
    <div className="offers-container mt-10 w-[90%] m-auto">
      {/* Centered Banner Title as Image */}
      <div className="flex justify-center mb-6">
        <img
          src={offerTitleAndBanner[0].img}
          alt={offerTitleAndBanner[0].alt}
          className="h-auto max-w-full" // Adjust height as needed
        />
      </div>

      {/* Grid for Offer Images */}
      <div className="grid grid-cols-2 gap-4">
        {offerTitleAndBanner.slice(1).map((offer) => ( // Skip the first item (title)
          <div key={offer.id} className="offer-item flex justify-center">
            <img
              src={offer.img}
              alt={offer.alt}
              className="h-auto w-auto object-cover rounded-lg shadow-md" // Adjust height as needed
            />
          </div>
        ))}
      </div>
    </div>
  );
}
