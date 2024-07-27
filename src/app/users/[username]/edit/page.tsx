import { EditUserForm } from "@/components/edit-user-form";
import { PageHeader } from "@/components/page-header";
import { getAuthenticatedUser } from "@/server/users/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Kihub | Update Profile",
};

interface Props {
  params: { username: string };
}

export default async function EditUserPage({ params: { username } }: Props) {
  const user = await getAuthenticatedUser();

  if (!user || user.username !== username) {
    return notFound();
  }

  return (
    <div>
      <PageHeader>Update Profile</PageHeader>
      <EditUserForm user={user} />
    </div>
  );
}
