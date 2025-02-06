import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ referrals }) {
    return (
        <AuthenticatedLayout>
            <Head title="Refer" />

            <div>
                Referral Index
                {referrals.map((referral) => (
                    <div key={referral.id}>
                        You referred {referral.client.firstName}{" "}
                        {referral.client.lastName} to {referral.user.firstName}{" "}
                        {referral.user.lastName}
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
