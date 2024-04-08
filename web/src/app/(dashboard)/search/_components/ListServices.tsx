'use client'

import ServiceCard from "@/app/(dashboard)/search/_components/ServiceCard";
import useServices from "@/hooks/services/useServices";

export default function ListServices() {
    const {data, isSuccess} = useServices()

    return (
      <>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {data?.items.map((item) => (
              <ServiceCard
                key={item.id}
                id={item.id}
                title={item.name}
                category={item.organization.name || ''}
                imageUrl={item.service_images?.[0]?.url}
                price={item.cost}
              />
            ))}
          </div>
          {isSuccess && data?.total === 0 && (
            <div className="text-center text-sm text-muted-foreground mt-10">
                <p className="font-googleSans">Нет доступных услуг</p>
            </div>
          )}
      </>
    )
}