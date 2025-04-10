import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import PostCard from "../Partials/PostCard";

export default function Index({ post }: any) {
    const user = usePage().props.auth.user;
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
                            <h1 className="text-2xl font-bold">{post.title}</h1>

                            <main className="container mx-auto mt-8">
                                <div className="flex flex-wrap justify-between">
                                    {/* Blog Content */}
                                    <div className="w-full px-4 mb-8 md:w-8/12">
                                        <img
                                            src={post.featured_image_url}
                                            alt="Featured"
                                            className="object-cover w-full h-64 rounded"
                                        />
                                        <h2 className="mt-4 mb-2 text-4xl font-bold">{post.title}</h2>
                                        <p className="mb-4 text-gray-700">{post.content}</p>
                                        <p className="text-sm text-gray-500">By: {post.user.name}</p>
                                        {user?.id == post.id && <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
                                            Edit
                                        </button>}
                                    </div>

                                    {/* Sidebar */}
                                    <div className="w-full px-4 mb-8 md:w-4/12">
                                        <div className="px-4 py-6 bg-gray-100 rounded">
                                            <h3 className="mb-2 text-lg font-bold">Category</h3>
                                            <ul className="space-y-1 list-disc list-inside">
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

