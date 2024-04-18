import {Metadata} from "next";
import ListOrganizations from "./_components/list-organizations";

export const metadata: Metadata = {
  title: "Поиск научных организаций в Казахстане",
  description: "Список научных организаций",
};

export default function OrganizationsPage() {
  return (
    <div className="p-6 space-y-4 container mx-auto">
      <ListOrganizations />
    </div>
   );
}