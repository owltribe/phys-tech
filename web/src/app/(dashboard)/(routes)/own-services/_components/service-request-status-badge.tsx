import React from "react";
import {Badge, BadgeProps} from "@radix-ui/themes";
import {ServiceRequestStatus} from "@/types/generated";
import {ServiceRequestEnum} from "@/lib/enums";

interface ServieRequestBadgeProps extends Omit<BadgeProps, 'color'> {
  status: ServiceRequestStatus;
}

const ServieRequestBadge = ({ status, ...badgeProps }: ServieRequestBadgeProps) => {
  const statuColorMap: Record<ServiceRequestStatus, BadgeProps['color']> = {
    "Pending": "yellow",
    "Approved": "blue",
    "Rejected": "red",
    "Completed": "green"
  }

  return (
    <Badge color={statuColorMap[status]} {...badgeProps}>
      {ServiceRequestEnum[status]}
    </Badge>
  );
};

export default ServieRequestBadge;
