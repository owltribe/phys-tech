import React from "react";
import {Badge} from "@radix-ui/themes";
import {OrganizationCategory} from "@/types/generated";
import {OrganizationCategoryLabel} from "@/lib/enums";

interface OrganizationCategoryBadgeProps {
  category: OrganizationCategory
}

type BadgeColor = React.ComponentProps<typeof Badge>['color']

const OrganizationCategoryBadge = ({category}: OrganizationCategoryBadgeProps) => {
  const colors: Record<OrganizationCategory, BadgeColor> = {
    "Scientific Institute": 'indigo',
    "University": 'blue',
    "Company": 'gray',
  };

  return (
    <Badge color={colors[category]} size="2">
      {OrganizationCategoryLabel[category]}
    </Badge>
  )
}

export default OrganizationCategoryBadge