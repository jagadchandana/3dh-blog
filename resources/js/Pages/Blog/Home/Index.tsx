import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PostCard from '../Partials/PostCard';
import SearchInput from '@/Components/SearchInput';
import Pagination from '@/Components/Pagination';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Post
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold">Blog</h1>
                            <p className="mt-2 text-gray-600">
                                Welcome to our blog! Explore insightful articles, tips, and stories to inspire and inform your journey.
                            </p>
                        </div>
                        <div className="p-6">
                            <div>
                                <h2 className="text-lg font-semibold">Search</h2>
                                <SearchInput resetSearch={undefined} />
                            </div>
                            <h2 className="text-lg font-semibold">Categories</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                                    Technology
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                                    Lifestyle
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                                    Travel
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                                    Food
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                                    Health
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
                            <PostCard />
                            <PostCard />
                            <PostCard />
                            <PostCard />
                        </div>
                        <div className="flex justify-center mt-6">
                           <Pagination links={[ ]} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
