import Image from "next/image";
import Link from "next/link";
import {BookOpen, Instagram} from "lucide-react";
import {formatPrice} from "@/lib/formatters";

// import { IconBadge } from "@/components/icon-badge";
// import { formatPrice } from "@/lib/format";
// import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl?: string;
  // chaptersLength: number;
  price: number;
  // progress: number | null;
  category: string;
};

export default function ServiceCard ({
  id,
  title,
  imageUrl,
  // chaptersLength,
  price,
  // progress,
  category
}: CourseCardProps) {
  return (
    <Link href={`/dashboard/services/${id}`}>
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
                <div className="flex flex-1 justify-center items-center">
                  <Instagram className="h-4 w-4" />
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
          {/*<div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">*/}
          {/*  <div className="flex items-center gap-x-1 text-slate-500">*/}
          {/*    <IconBadge size="sm" icon={BookOpen} />*/}
          {/*    <span>*/}
          {/*      {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*{progress !== null ? (*/}
          {/*  <CourseProgress*/}
          {/*    variant={progress === 100 ? "success" : "default"}*/}
          {/*    size="sm"*/}
          {/*    value={progress}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <p className="text-md md:text-sm font-medium text-slate-700">*/}
          {/*    {formatPrice(price)}*/}
          {/*  </p>*/}
          {/*)}*/}
           <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
           </p>
        </div>
      </div>
    </Link>
  )
}