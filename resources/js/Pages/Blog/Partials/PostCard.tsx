export default function PostCard({ }) {
    return (
        <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm max-w-xl hover:bg-gray-100">
            <img
                className="object-cover w-full rounded-t-lg h-96"
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="card-image" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Noteworthy technology acquisitions 2021
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
            </div>
        </a>
    );
};
