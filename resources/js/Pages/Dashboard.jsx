import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Hello, {auth.user.name}!
                        </div>
                        <Link
                            href="/clients"
                            className={
                                "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "
                            }
                        >
                            Manage Clients
                        </Link>
                        <Link
                            className={
                                "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "
                            }
                        >
                            Refer a Client to a Coach
                        </Link>
                        <Link
                            className={
                                "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "
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
