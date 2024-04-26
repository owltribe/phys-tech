'use client'

import {Avatar, Badge, Box, DropdownMenu, Flex, Heading, Text} from "@radix-ui/themes";
import {UserReadWithOrganization} from "@/types/generated";
import {useAuth} from "@/providers/AuthProvider";
import {Building2, LogOut, User2} from "lucide-react";
import {useState} from "react";
import ProfileDialog from "@/components/dialogs/profile-dialog";
import {getNonCachingImgUrl} from "@/lib/utils";
import OrganizationProfileDialog from "@/components/dialogs/organization-profile-dialog";

interface UserButtonProps {
  user: UserReadWithOrganization
}

const UserButton = ({user}: UserButtonProps) => {
  const {
    onLogout,
  } = useAuth();

  const [isProfileDialogOpened, setIsProfileDialogOpened] = useState(false)
  const [isOrganizationProfileDialogOpened, setIsOrganizationProfileDialogOpened] = useState(false)

  const isOrganization = user.role === 'Organization'

  const roleColor = isOrganization ? 'green' : 'blue'
  const roleBadgeText = isOrganization ? 'Организация' : 'Клиент'

  const handleOpenProfileDialog = () => {
    setIsProfileDialogOpened(true)
  }
  const handleOpenOrganizationProfileDialog = () => {
    setIsOrganizationProfileDialogOpened(true)
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Box>
            <Avatar
              radius="full"
              src={getNonCachingImgUrl(user.avatar)}
              fallback={`${user.first_name[0]}${user.last_name[0]}`}
              color={roleColor}
            />
          </Box>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Flex direction="column" py="3" px="3" gap="1">
            <Heading size="2">
              {user.full_name}
            </Heading>
            <Text size="2" color="gray">
              {user.email}
            </Text>
            <Text size="2" color="gray">
              {user.contact}
            </Text>

            <Flex>
              <Badge color={roleColor} variant="outline">
                {roleBadgeText}
              </Badge>
            </Flex>
          </Flex>

          <DropdownMenu.Separator  />

          <DropdownMenu.Item onClick={handleOpenProfileDialog}>
            <User2 className="h-4 w-4" />
            Профиль
          </DropdownMenu.Item>
          {!!user.organization && (
            <DropdownMenu.Item onClick={handleOpenOrganizationProfileDialog}>
              <Building2 className="h-4 w-4" />
              Организация
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Separator />

          <DropdownMenu.Item color="red" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
            Выйти
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {(user && isProfileDialogOpened) && (
        <ProfileDialog
          user={user}
          open={isProfileDialogOpened}
          onOpenChange={setIsProfileDialogOpened}
        />
      )}
      {(user && user.organization && isOrganizationProfileDialogOpened) && (
        <OrganizationProfileDialog
          organization={user.organization}
          open={isOrganizationProfileDialogOpened}
          onOpenChange={setIsOrganizationProfileDialogOpened}
        />
      )}
    </>
  )
}

export default UserButton