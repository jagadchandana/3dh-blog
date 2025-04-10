import { Link, usePage } from "@inertiajs/react";

export default function PostCard({ post }: any) {
    const user = usePage().props.auth.user;
    return (
        <div className="flex flex-col items-center max-w-xl bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
            <Link href={route('home.show', { slug: post.slug })} >
            <img
                className="object-cover w-full rounded-t-lg h-96"
                src={post.featured_image_url}
                alt="card-image" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {post.title.length > 30 ? `${post.title.substring(0, 30)}...` : post.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                {post.content.length > 50 ? `${post.content.substring(0, 50)}...` : post.content}
                </p>
                <p className="text-sm text-gray-500">
                Written by: {post.user.name}
                </p>
            </div>
            </Link>
            {user && user?.id === post?.user_id && (
            <Link
                href={route('posts.edit', { slug: post.slug })}
                className="mt-2 text-blue-500 hover:underline"
            >
                Edit
            </Link>
            )}
        </div>
    );
};
