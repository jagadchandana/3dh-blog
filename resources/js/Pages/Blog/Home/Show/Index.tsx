import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import PostCard from "../Partials/PostCard";

export default function Index({ post }: any) {
    const user = usePage().props.auth.user;
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
                            <h1 className="text-2xl font-bold">{post.title}</h1>

                            <main className="container mx-auto mt-8">
                                <div className="flex flex-wrap justify-between">
                                    {/* Blog Content */}
                                    <div className="w-full md:w-8/12 px-4 mb-8">
                                        <img
                                            src={post.featured_image_url}
                                            alt="Featured"
                                            className="w-full h-64 object-cover rounded"
                                        />
                                        <h2 className="text-4xl font-bold mt-4 mb-2">{post.title}</h2>
                                        <p className="text-gray-700 mb-4">{post.content}</p>
                                        <p className="text-sm text-gray-500">By: {post.user.name}</p>
                                        {user?.id == post.id && <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                            Edit
                                        </button>}
                                    </div>

                                    {/* Sidebar */}
                                    <div className="w-full md:w-4/12 px-4 mb-8">
                                        <div className="bg-gray-100 px-4 py-6 rounded">
                                            <h3 className="text-lg font-bold mb-2">Category</h3>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li><a href="#" className="text-gray-700 hover:text-gray-900">{post.category.name}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

