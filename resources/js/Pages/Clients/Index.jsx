import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Client from '@/Components/Client';
import ClientForm from '@/Components/ClientForm';
import { Head } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ auth, clients }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <AuthenticatedLayout>
      <Head title="Clients" />

      <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex justify-end">
          <SecondaryButton onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Create Client'}
          </SecondaryButton>
        </div>

        {showForm && <ClientForm className="mb-6" />}

        <div className="mt-6 divide-y rounded-lg bg-white shadow-sm">
          {clients.map(client => (
            <Client key={client.id} client={client} />
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
