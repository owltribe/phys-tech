import EmptyStatement from "components/EmptyStatement";
import useServices from "hooks/services/useServices";
import { YStack } from "tamagui";
import {ServiceCard} from "../../services";
export const Service = ({ search }: { search?: string }) => {
    const { data } = useServices({search: search});

    return (
        <>
            {data?.data ? (
                <YStack>
                    {data?.data.items.map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.name}
                            description={service.description}
                            imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg"
                        />
                    ))}
                </YStack>
            ) : (
                <EmptyStatement description="Услуги не найдены" />
            )}
        </>
    );

}
