'use client';

import {useSearchParams} from "next/navigation";
import useOrganizations from "@/hooks/organization/useOrganizations";
import OrganizationCard from "./organization-card";
import {Container} from "@radix-ui/themes";

const ListOrganizations = () => {
  const searchParams = useSearchParams();

  const {data, isSuccess} = useOrganizations({
    search: searchParams.get("search")
  })

  return (
    <Container>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.items.map((organization) => (
          <OrganizationCard
            key={organization.id}
            organization={organization}
          />
        ))}
      </div>
      {isSuccess && data?.total === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          <p className="font-googleSans">Нет доступных организаций</p>
        </div>
      )}
    </Container>
  )
}

export default ListOrganizations;