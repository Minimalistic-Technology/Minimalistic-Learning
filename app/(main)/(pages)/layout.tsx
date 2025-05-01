import React from 'react';
import { getServerSession } from 'next-auth';
import { Redirect } from '../../components/Redirect';
import Sidebar from '../../components/ui/Sidebar';


interface Props {
  children: React.ReactNode;
}

export default async function MainLayout(props: Props) {
  const session = await getServerSession();
  if (!session?.user) {
    return <Redirect to={'/'} />;
  }
  return (
    <div className="flex h-screen">
      <div className="w-64 h-full border-r">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto py-16">
        {props.children}
      </div>
    </div>
  );
}
