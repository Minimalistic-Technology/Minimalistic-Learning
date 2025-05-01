import Image from "next/image";{/*started by sunny*/}
import { Bookmark } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
}

export function CourseCard({ title, description, image }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm group h-[320px] flex flex-col">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 flex-1">{description}</p>
        <div className="flex justify-end mt-2">
          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Bookmark course">
            <Bookmark className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}{/*ended by sunny*/}