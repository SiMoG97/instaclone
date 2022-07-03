import React from "react";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const profileName = router.query.profileId;
  // console.log(router);
  return (
    <div>
      <h1>{profileName}</h1>
      <h1>{profileName}</h1>
      <h1>{profileName}</h1>
      <h1>{profileName}</h1>
      <h1>{profileName}</h1>
    </div>
  );
};

export default Profile;
