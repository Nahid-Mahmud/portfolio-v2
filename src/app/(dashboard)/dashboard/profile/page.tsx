import Profile from "@/components/Profile";
import { getMyProfile } from "@/actions/user.actions";

export default async function ProfilePage() {
  const profileRes = await getMyProfile();
  const profile = profileRes.success ? profileRes.data : null;
  return (
    <div>
      <Profile profile={profile} />
    </div>
  );
}
