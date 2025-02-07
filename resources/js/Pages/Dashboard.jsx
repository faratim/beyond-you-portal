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
            {/* Greeting */}
            <div className="mt-6 p-6 px-5 text-gray-900">Hello, {auth.user.firstName}!</div>

            {/* Buttons Container */}
            <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-center">
              {/* Using a consistent width wrapper for each button */}
              <Link href="/clients" className="w-full sm:w-56">
                <SecondaryButton className="w-full whitespace-nowrap">
                  Manage Your Clients
                </SecondaryButton>
              </Link>

              <Link href="/clients" className="w-full sm:w-56">
                <SecondaryButton className="w-full whitespace-nowrap">
                  Manage Your Referrals
                </SecondaryButton>
              </Link>

              <Link href="/clients" className="w-full sm:w-56">
                <SecondaryButton className="w-full whitespace-nowrap">
                  Check Your Payments
                </SecondaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
