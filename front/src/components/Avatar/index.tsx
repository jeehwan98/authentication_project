import { stringAvatar } from "@/lib/constants/user";
import { Avatar } from "@mui/material";

interface ProfileAvatarProps {
  image?: string;
  name: string;
  sx?: object;
  fontSize: number;
}

export default function ProfileAvatar({
  image,
  name,
  sx,
  fontSize
}: ProfileAvatarProps) {
  <Avatar
    src={image}
    alt={`${name}'s profile`}
    sx={sx}
  />

  return (
    image ? (
      <Avatar
        src={image}
        alt={`${name}'s profile`}
        sx={sx}
      />
    ) : (
      <Avatar
        {...stringAvatar(name)}
        sx={{ ...stringAvatar(name).sx, fontSize: `${fontSize}px`, ...sx }}
      />
    )
  )
}