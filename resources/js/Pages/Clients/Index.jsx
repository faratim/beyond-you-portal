import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Client from "@/Components/Client";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import PhoneInput from "@/Components/PhoneInput";

export default function Index({ auth, clients }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        // note: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("clients.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Clients" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} className="space-y-4">
                    <input
                        value={data.firstName}
                        type="text"
                        placeholder="First Name"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("firstName", e.target.value)}
                    />
                    <input
                        value={data.lastName}
                        type="text"
                        placeholder="Last Name"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("lastName", e.target.value)}
                    />
                    <input
                        value={data.email}
                        type="text"
                        placeholder="Email"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <PhoneInput
                        value={data.phone}
                        onChange={(value) => setData("phone", value)}
                    />
                    {/* <textarea
                        value={data.note}
                        placeholder="Note"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("note", e.target.value)}
                    ></textarea> */}
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {clients.map((client) => (
                        <Client key={client.id} client={client} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
