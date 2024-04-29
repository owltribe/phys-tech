import {Metadata} from "next";
import ListOwnServiceRequestsTable from "./_components/list-own-service-requsts-table";

export const metadata: Metadata = {
  title: "Поиск научных услуг в Казахстане",
  description: "Список услуг организаций, запрос услуг у организаций",
};

export default function ServicesPage() {
  return (
    <div className="p-6 space-y-4 container mx-auto">
      <ListOwnServiceRequestsTable />
    </div>
   );
}