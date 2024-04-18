import {Metadata} from "next";
import ListEvents from "./_components/list-events";

export const metadata: Metadata = {
  title: "Поиск мероприятий в Казахстане",
  description: "Список мероприятий",
};

const EventsPage = () => {
  return (
    <div className="p-6 space-y-4 container mx-auto">
      <ListEvents />
    </div>
  );
}

export default EventsPage