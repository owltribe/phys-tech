import ListServices from "@/app/(dashboard)/services/_components/list-services";
import Head from "next/head";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Поиск научных услуг в Казахстане",
  description: "Список услуг организаций, запрос услуг у организаций",
};

export default function ServicesPage() {
  return (
    <div className="p-6 space-y-4 container mx-auto">
      <ListServices />
    </div>
   );
}