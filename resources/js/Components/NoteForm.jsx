import React from 'react';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import SecondaryButton from './SecondaryButton';

const NoteForm = ({ clientId, onSuccess }) => {
  const { data, setData, post, processing, reset } = useForm({
    client_id: clientId,
    title: '',
    note: '',
    status: 'active',
    visibility: 'private',
  });

  const submit = e => {
    e.preventDefault();
    post(route('notes.store'), {
      onSuccess: () => {
        reset();
        toast.success('Note added successfully');
        onSuccess?.(); // Call onSuccess if provided
      },
      onError: () => {
        toast.error('Failed to add note');
      },
    });
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-4">
      <div>
        <input
          type="text"
          value={data.title}
          onChange={e => setData('title', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Note title..."
        />
      </div>

      <div>
        <textarea
          value={data.note}
          onChange={e => setData('note', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="3"
          placeholder="Add your note..."
        ></textarea>
      </div>

      <div className="flex gap-4">
        <select
          value={data.visibility}
          onChange={e => setData('visibility', e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <select
          value={data.status}
          onChange={e => setData('status', e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="flex justify-end">
        <SecondaryButton
          type="submit"
          disabled={processing}
          className="inline-flex items-center px-4 py-2"
        >
          Add Note
        </SecondaryButton>
      </div>
    </form>
  );
};

export default NoteForm;
