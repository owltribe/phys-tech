import { ServiceRead } from "types/generated";

import BaseCard from "./BaseCard";

const ServiceCard = ({
  data,
  onPress
}: {
  data: ServiceRead;
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
