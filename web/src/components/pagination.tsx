'use client'

import {usePagination} from "@mantine/hooks";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {IconButton, Theme} from "@radix-ui/themes";
import {ChevronLeft, ChevronRight} from "lucide-react";
import qs from "query-string";

interface PaginationProps {
  page: number;
  total: number
}


const Pagination = ({total, page}: PaginationProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const pagination = usePagination({
    total,
    page,
  })

  const handleClick = (page: number) => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        search: searchParams.get("search"),
        category: searchParams.get("category"),
        page,
      },
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }

  return (
    <Theme radius="large">
      <nav className="flex items-center gap-x-1">
        <IconButton
          disabled={page === 1}
          variant="soft"
          size="3"
          onClick={() => handleClick(page - 1)}
        >
          <ChevronLeft className="size-5" />
        </IconButton>
        <div className="flex items-center gap-x-1">
          {pagination.range.map(item => {
            if (item === "dots") {
              return (
                <IconButton
                  key={item}
                  variant="soft"
                  color="gray"
                  size="3"
                  className="bg-transparent"
                >
                  •••
                </IconButton>
              )
            } else {
              return (
                <IconButton
                  key={item}
                  variant={item === page ? "solid" : "outline"}
                  size="3"
                  onClick={() => handleClick(item)}
                >
                  {item}
                </IconButton>
              )
            }
          })}
        </div>
        <IconButton
          disabled={page === total}
          variant="soft"
          size="3"
          onClick={() => handleClick(page + 1)}
        >
          <ChevronRight className="size-5" />
        </IconButton>
      </nav>
    </Theme>
  )
}

export default Pagination