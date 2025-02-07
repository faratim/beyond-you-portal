import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage, router } from '@inertiajs/react';
import NoteForm from './NoteForm';

dayjs.extend(relativeTime);

export default function Client({ client }) {
  const [expandedNotes, setExpandedNotes] = useState(new Set());
  const [showNoteForm, setShowNoteForm] = useState(false);
  const { auth } = usePage().props;
  const [editing, setEditing] = useState(false);

  const { data, setData, patch, clearErrors, errors, reset } = useForm({
    firstName: client.firstName,
    lastName: client.lastName,
    email: client.email,
    phone: client.phone,
  });

  const submit = e => {
    e.preventDefault();
    patch(route('clients.update', client.id), {
      preserveScroll: true,
      onSuccess: () => setEditing(false),
    });
  };

  const toggleNoteExpansion = noteId => {
    setExpandedNotes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(noteId)) {
        newSet.delete(noteId);
      } else {
        newSet.add(noteId);
      }
      return newSet;
    });
  };

  return (
    <div className="flex space-x-4 rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Left Column - Avatar/Icon */}
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </div>

      {/* Right Column - Content */}
      <div className="flex-1">
        {/* Header - Client Info + Actions */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-gray-900">
              {client.firstName} {client.lastName}
            </h3>
            <div className="flex flex-col text-sm text-gray-500">
              <span>{client.email}</span>
              <span>{client.phone}</span>
              <span>Member since {dayjs(client.created_at).fromNow()}</span>
            </div>
          </div>

          {/* Actions Dropdown */}
          {client.user_id === auth.user.id && (
            <div className="flex space-x-2">
              <button
                onClick={() => setEditing(true)}
                className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this client?')) {
                    router.delete(route('clients.destroy', client.id));
                  }
                }}
                className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Notes Section */}
        {client.notes.length > 0 && (
          <div className="mt-4 space-y-3">
            {client.notes.map(note => (
              <div
                key={note.id}
                className="rounded-md bg-gray-50 p-3 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    {note.title && <h4 className="font-medium text-gray-900">{note.title}</h4>}
                    <div className="text-gray-600">
                      {note.note.length > 50 && !expandedNotes.has(note.id)
                        ? `${note.note.substring(0, 50)}...`
                        : note.note}
                    </div>
                  </div>
                  {note.note.length > 50 && (
                    <button
                      className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-800"
                      onClick={() => toggleNoteExpansion(note.id)}
                    >
                      {expandedNotes.has(note.id) ? 'See Less' : 'See More'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Form - your existing edit form code */}
        {editing && (
          <form onSubmit={submit} className="mt-4">
            <div className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={e => setData('firstName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <InputError message={errors.firstName} className="mt-2" />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={e => setData('lastName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <InputError message={errors.lastName} className="mt-2" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={e => setData('phone', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <InputError message={errors.phone} className="mt-2" />
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="mt-4 space-x-2">
              <PrimaryButton>Save</PrimaryButton>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
                onClick={() => {
                  setEditing(false);
                  reset();
                  clearErrors();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-4">
          {!showNoteForm ? (
            <button
              onClick={() => setShowNoteForm(true)}
              className="inline-flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Note</span>
            </button>
          ) : (
            <div className="space-y-4">
              <NoteForm clientId={client.id} onSuccess={() => setShowNoteForm(false)} />
              <button
                onClick={() => setShowNoteForm(false)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
