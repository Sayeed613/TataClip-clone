import { quicklinks } from "../assets/assets";

export default function QuickLinks() {
  return (
    <div className="mt-10 w-[90%] m-auto">
      <div className="flex gap-6 overflow-x-auto py-4 hide-scrollbar">
        {quicklinks.map((link) => (
          <img
            key={link.id}
            src={link.img}
            alt={link.alt}
            className="h-24 w-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover shrink-0"
          />
        ))}
      </div>
      <hr />
    </div>
  );
}
