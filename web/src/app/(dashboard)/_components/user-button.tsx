'use client'

import {Avatar, Badge, Box, DropdownMenu, Flex, Heading, Text} from "@radix-ui/themes";
import {UserReadWithOrganization} from "@/types/generated";
import {useAuth} from "@/providers/AuthProvider";
import {Building2, LogOut, User2} from "lucide-react";
import {useState} from "react";
import ProfileDialog from "@/components/dialogs/profile-dialog";

interface UserButtonProps {
  user: UserReadWithOrganization
}

const UserButton = ({user}: UserButtonProps) => {
  const {
    onLogout,
  } = useAuth();

  const [isProfileDialogOpened, setIsProfileDialogOpened] = useState(false)

  const isOrganization = user.role === 'Organization'

  const roleBadgeColor = isOrganization ? 'green' : 'blue'
  const roleBadgeText = isOrganization ? 'Организация' : 'Клиент'

  const handleOpenProfileDialog = () => {
    setIsProfileDialogOpened(true)
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Box>
            <Avatar
              radius="full"
              src={user.avatar || undefined}
              fallback={`${user.first_name[0]}${user.last_name[0]}`}
              color={roleBadgeColor}
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
              <Badge color={roleBadgeColor} variant="outline">
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
            <DropdownMenu.Item>
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
    </>
  )
}

export default UserButton