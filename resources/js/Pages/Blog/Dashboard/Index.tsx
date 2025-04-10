import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ postCount }:any) {
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
                            <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
                            <p className="mt-2 text-gray-700">
                                Here you can manage your blog posts, view analytics, and customize your settings.
                            </p>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-4 bg-blue-100 rounded-lg shadow relative">
                                    <a
                                        href={route('posts.index')}
                                        className="absolute top-4 right-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                    >
                                        View My Posts
                                    </a>
                                    <h2 className="text-lg font-semibold text-blue-800">Total Posts</h2>
                                    <p className="mt-1 text-2xl font-bold text-blue-900">{postCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
