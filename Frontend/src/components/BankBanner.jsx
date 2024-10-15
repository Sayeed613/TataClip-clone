import { bankBanner } from "../assets/assets";

export default function BankBanner() {
  return (
    <div className="flex justify-center">
      <div className="flex gap-4 overflow-x-auto py-4 hide-scrollbar">
        {bankBanner.map((link) => (
          <div key={link.id} className="flex-shrink-0">
            <img
              src={link.img}
              alt={link.alt}
              className="h-24 w-auto object-cover rounded-lg shadow-md" // Adjust height as needed
            />
          </div>
        ))}
      </div>
    </div>
  );
}
