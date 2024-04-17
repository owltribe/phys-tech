'use client';

import {useSearchParams} from "next/navigation";
import useOrganizations from "@/hooks/organization/useOrganizations";
import OrganizationCard from "./organization-card";
import {Container, Flex, RadioCards, ScrollArea, Text} from "@radix-ui/themes";
import {OrganizationCategoryEnum} from "@/lib/enums";
import CategoryItem from "@/app/(dashboard)/organizations/_components/category-item";

const ListOrganizations = () => {
  const searchParams = useSearchParams();
  const categorySearchParam = searchParams.get("category")

  const {data, isSuccess} = useOrganizations({
    search: searchParams.get("search"),
    category: categorySearchParam
  })
  
  const categoryFilters = Object.entries(OrganizationCategoryEnum)
    .map(([value, label]) => ({ value, label }));

  const isAllCategoriesFilterActive = categorySearchParam
    ? !categoryFilters.map(({value}) => value).includes(categorySearchParam)
    : true

  return (
    <Container>
      <ScrollArea scrollbars="horizontal" mb="3">
        <Flex gap="2">
          <CategoryItem href="/organizations" isActive={isAllCategoriesFilterActive}>
            Все категории
          </CategoryItem>
          {categoryFilters.map(({label, value}) => (
            <CategoryItem
              key={value}
              href={`/organizations?category=${value}`}
              isActive={categorySearchParam === value}
            >
              {label}
            </CategoryItem>
          ))}
        </Flex>
      </ScrollArea>

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