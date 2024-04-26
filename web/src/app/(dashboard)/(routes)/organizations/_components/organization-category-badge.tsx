import React from "react";
import {Badge} from "@radix-ui/themes";
import {OrganizationCategory} from "@/types/generated";
import {OrganizationCategoryEnum} from "@/lib/enums";

interface OrganizationCategoryBadgeProps {
  category: OrganizationCategory
}

type BadgeColor = React.ComponentProps<typeof Badge>['color']

const OrganizationCategoryBadge = ({category}: OrganizationCategoryBadgeProps) => {
  const colors: Record<OrganizationCategory, BadgeColor> = {
    "Scientific Institute": 'jade',
    "University": 'blue',
    "Company": 'gray',
  };

  return (
    <Badge color={colors[category]} size="2">
      {OrganizationCategoryEnum[category]}
    </Badge>
  )
}

export default OrganizationCategoryBadge