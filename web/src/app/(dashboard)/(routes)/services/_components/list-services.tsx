'use client';

import ServiceCard from "@/app/(dashboard)/(routes)/services/_components/service-card";
import useServices from "@/hooks/services/useServices";
import {useSearchParams} from "next/navigation";
import {Container} from "@radix-ui/themes";
import CardListLoader from "@/components/loaders/card-list-loader";

const ListServices = () => {
  const searchParams = useSearchParams();

  const {data, isSuccess, isLoading} = useServices({
    search: searchParams.get("search")
  })

  return (
    <Container>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {isLoading && <CardListLoader />}

        {data?.items.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}
      </div>
      {isSuccess && data?.total === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          <p className="font-googleSans">Нет доступных услуг</p>
        </div>
      )}
    </Container>
  )
}

export default ListServices;