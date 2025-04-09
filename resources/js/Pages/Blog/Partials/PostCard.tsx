export default function PostCard({ post }: any) {
    return (
        <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm max-w-xl hover:bg-gray-100">
            <img
                className="object-cover w-full rounded-t-lg h-96"
                src={post.featured_image_url}
                alt="card-image" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {post.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                    {post.content}
                </p>
            </div>
        </a>
    );
};
