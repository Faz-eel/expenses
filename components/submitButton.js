'use client'

import { useFormStatus } from "react-dom";

export default function SubmitButton({ className }) {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className={className}>
            {pending ? 'Saving...' : 'Save'}
        </button>
    )
}
