'use client';

import {useSearchParams} from "next/navigation";
import useOrganizations from "@/hooks/organization/useOrganizations";
import OrganizationCard from "./organization-card";
import {Container, Flex, RadioCards, ScrollArea, Text} from "@radix-ui/themes";
import {OrganizationCategoryEnum} from "@/lib/enums";
import CategoryItem from "@/app/(dashboard)/(routes)/organizations/_components/category-item";
import {Suspense} from "react";
import CardListLoader from "@/components/loaders/card-list-loader";
import Pagination from "@/components/pagination";

const ListOrganizations = () => {
  const searchParams = useSearchParams();
  const categorySearchParam = searchParams.get("category")

  const currentPage = Number(searchParams.get("page")) || 1

  const {
    data,
    isSuccess,
    isLoading,
    isFetching,
  } = useOrganizations({
    search: searchParams.get("search"),
    category: categorySearchParam,
    page: String(currentPage)
  })
  
  const categoryFilters = Object.entries(OrganizationCategoryEnum)
    .map(([value, label]) => ({ value, label }));

  const isAllCategoriesFilterActive = categorySearchParam
    ? !categoryFilters.map(({value}) => value).includes(categorySearchParam)
    : true

  return (
    <Container>
      <ScrollArea scrollbars="horizontal">
        <Flex gap="2" mb="4">
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
        {(isLoading || isFetching) && <CardListLoader />}

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
      {isSuccess && !!data && (
        <div className="flex justify-center my-8">
          <Pagination
            page={currentPage}
            total={data.pages as number}
          />
        </div>
      )}
    </Container>
  )
}

export default ListOrganizations;