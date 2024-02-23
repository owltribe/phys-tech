import { ServiceRead } from "types/generated";

import { formatCost } from "../../utils/money-formatter";

import BaseCard from "./BaseCard";

const ServiceCard = ({
  data,
  onPress,
  organizationView
}: {
  data: Pick<ServiceRead, "name" | "organization" | "cost">;
  onPress?: () => void;
  organizationView?: boolean;
}) => {
  return (
    <BaseCard
      title={data.name}
      description={
        organizationView ? formatCost(data.cost) : data.organization.name
      }
      onPress={onPress}
    />
  );
};

export default ServiceCard;
