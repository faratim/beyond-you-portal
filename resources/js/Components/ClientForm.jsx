import React from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import PhoneInput from '@/Components/PhoneInput';
import FormInput from './FormInput';
import toast from 'react-hot-toast';

export default function ClientForm({ className = '' }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    noteTitle: '',
    note: '',
  });

  const submit = e => {
    e.preventDefault();

    post(route('clients.store'), {
      onSuccess: () => {
        reset();
        toast.success('Client added successfully!');
      },
      onError: () => {
        toast.error('Failed to add client');
      },
    });
  };

  return (
    <>
      <h1 className="mb-4 text-xl font-medium">Create a New Client</h1>
      <form onSubmit={submit} className={`mb-12 space-y-4 ${className}`}>
        <FormInput
          value={data.firstName}
          placeholder="First Name"
          onChange={e => setData('firstName', e.target.value)}
        />
        <FormInput
          value={data.lastName}
          placeholder="Last Name"
          onChange={e => setData('lastName', e.target.value)}
        />
        <FormInput
          value={data.email}
          type="email"
          placeholder="Email"
          onChange={e => setData('email', e.target.value)}
        />
        <PhoneInput value={data.phone} onChange={value => setData('phone', value)} />
        {/* Add the notes textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Initial Note (optional)</label>
          <input
            type="text"
            value={data.noteTitle}
            onChange={e => setData('noteTitle', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Note Title (optional)"
          />
          <InputError message={errors.noteTitle} className="mt-2" />
        </div>
        <textarea
          value={data.note}
          placeholder="Add a Note (optional)"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
          onChange={e => setData('note', e.target.value)}
        />
        <InputError message={errors.message} className="mt-2" />
        <PrimaryButton className="mt-4" disabled={processing}>
          Submit
        </PrimaryButton>
      </form>
    </>
  );
}
