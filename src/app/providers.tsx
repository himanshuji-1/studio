'use client';

import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/lib/auth';
import { APIProvider } from '@vis.gl/react-google-maps';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
        </APIProvider>
    );
}
