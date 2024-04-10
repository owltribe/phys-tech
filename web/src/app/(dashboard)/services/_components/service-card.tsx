import Image from "next/image";
import Link from "next/link";
import {Instagram} from "lucide-react";
import {formatPrice} from "@/lib/formatters";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl?: string;
  price: number;
  category: string;
}

const ServiceCard = ({
  id,
  title,
  imageUrl,
  price,
  category
}: CourseCardProps) => {
  return (
    <Link href={`/services/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
        <div className="relative w-full aspect-video overflow-hidden">
          {imageUrl ? (
            <Image
              fill
              className="object-cover"
              alt={title}
              src={imageUrl}
            />
          ) : (
            <div className="bg-gray-100 flex w-full h-full justify-center items-center">
              <Instagram className="h-7 w-7" />
            </div>
          )}
        </div>
        <div className="flex flex-col pt-2 p-3">
          <div className="text-sm md:text-base font-medium group-hover:text-sky-700 transition line-clamp-1">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            {category}
          </p>
          <p className="text-md md:text-sm font-medium text-slate-700">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ServiceCard;