import {Card, H4, Paragraph, ScrollView, Stack} from "tamagui";
import useOrganization from "../../../../hooks/organization/useOrganization";
import {useRouter} from "expo-router";

export const Organization = ({ nameLike }: { nameLike?: string }) => {
    const router = useRouter();

    const { data, error, isLoading } = useOrganization({ nameLike });
    return (
      <Stack
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          rowGap={10}
      >
          {data?.data && data.data.map((organization) => (
              <Card
                  key={organization.id}
                  animation="lazy"
                  size="$4"
                  width="48%"
                  scale={0.9}
                  hoverStyle={{ scale: 0.925 }}
                  pressStyle={{ scale: 0.875 }}
                  p="$2"
                  bordered
                  borderRadius="$6"
                  backgroundColor="$blue2"
                  onPress={() => router.push(`organization/${organization.id}}`)}
              >
                  <Card.Header padded>
                      <H4>{organization.name}</H4>
                      <Paragraph theme="alt2">{organization.description}</Paragraph>
                  </Card.Header>
              </Card>
          ))}
      </Stack>
  );
}
