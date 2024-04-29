import ListServices from "@/app/(dashboard)/(routes)/services/_components/list-services";
import {Metadata} from "next";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Поиск научных услуг в Казахстане",
  description: "Список услуг организаций, запрос услуг у организаций",
};

export default function ServicesPage() {
  const queryClient = new QueryClient()

  return (
    <div className="p-6 space-y-4 container mx-auto">
      <ListServices />
    </div>
   );
}