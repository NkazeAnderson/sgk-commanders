import { userT } from "sgk-commanders-shared";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function UserCard({ user }: { user: userT }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        {user.profile_picture ? (
          <AvatarImage src={user.profile_picture} alt={user.name} />
        ) : (
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col">
        <div className="font-medium">{user.name}</div>
        <div className="text-sm text-muted-foreground">{user.email}</div>
      </div>
    </div>
  );
}

export default UserCard;
