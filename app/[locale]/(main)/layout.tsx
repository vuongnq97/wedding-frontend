import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { UserInfo } from '@/types/auth';

export default async function MainLayout({ children }: { children: ReactNode }) {
    const year = new Date().getFullYear();
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('auth-user')?.value;
    let initialUser: UserInfo | null = null;

    if (userCookie) {
        try {
            initialUser = JSON.parse(decodeURIComponent(userCookie)) as UserInfo;
        } catch (error) {
            console.error('Failed to parse auth-user cookie', error);
        }
    }

    return (
        <div className="bg-background text-foreground relative flex min-h-screen flex-col">
            <Header initialUser={initialUser} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8">
                    {children}
                </main>
            </div>
            <Footer year={year} />
        </div>
    );
}
