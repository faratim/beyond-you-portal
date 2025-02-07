import NavLink from '@/Components/NavLink';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
  const { auth } = usePage().props;

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="mt-6 p-6 px-5 text-gray-900">Hello, {auth.user.firstName}!</div>
            <Link href="/clients">
              <SecondaryButton>Manage Your Clients</SecondaryButton>
            </Link>
            <Link
              href={route('referral.create')}
              className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
              }
            >
              Refer a Client to a Coach
            </Link>
            <Link
              className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
              }
            >
              See Your Referrals
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
