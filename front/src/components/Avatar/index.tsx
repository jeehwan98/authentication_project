import { Avatar } from "@mui/material";

interface ProfileAvatarProps {
  image: string;
  name: string;
  sx: object;
}

export default function ProfileAvatar({
  image,
  name,
  sx
}: ProfileAvatarProps) {
  return (
    <Avatar
      src={image}
      alt={`${name}'s profile`}
      sx={{ sx }}
    />
  );
}