import { ServiceRead } from "types/generated";

import BaseCard from "./BaseCard";

const ServiceCard = ({
  data,
  onPress
}: {
  data: Pick<ServiceRead, "name" | "organization">;
  onPress?: () => void;
}) => {
  return (
    <BaseCard
      title={data.name}
      description={data.organization.name}
      onPress={onPress}
    />
  );
};

export default ServiceCard;
