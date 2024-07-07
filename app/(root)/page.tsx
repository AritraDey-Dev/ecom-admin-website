import { UserButton } from '@clerk/nextjs';

function SetupPage() {
  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default SetupPage;
