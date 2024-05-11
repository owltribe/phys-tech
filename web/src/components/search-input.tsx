"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import React, {useEffect, useMemo, useState} from "react";
import {useRouter, usePathname} from "next/navigation";

import useDebounce from "@/hooks/useDebounce";
import {Box, TextField} from "@radix-ui/themes";

export const SearchInput = () => {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const pathname = usePathname();

  const isServicesPage = ['/services', '/own-services'].includes(pathname)
  const isOrganizationsPage = pathname === '/organizations'
  const isEventsPage = pathname === '/events'

  const searchFieldPlaceholder = useMemo(() => {
    if (isServicesPage) {
      return "Поиск услуги по названию или описанию"
    }
    if (isOrganizationsPage) {
      return "Поиск организации по названию или описанию"
    }
    if (isEventsPage) {
      return "Поиск мероприятий по названию или описанию"
    }

    return "Поиск"
  }, [isEventsPage, isOrganizationsPage, isServicesPage])

  useEffect(() => {
    // Parse the current query string
    const parsedQuery = qs.parse(pathname);

    // Stringify the updated query back into a URL query string
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        ...parsedQuery,
        search: debouncedValue,
      },
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, router, pathname])

  return (
    <Box maxWidth="600px" width="100%">
      <TextField.Root
        size="3"
        placeholder={searchFieldPlaceholder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        color="gray"
        variant="soft"
      >
        <TextField.Slot side="right" className="rounded-r-lg bg-sky-600">
          <Search className="h-4 w-4 stroke-white" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  )
}