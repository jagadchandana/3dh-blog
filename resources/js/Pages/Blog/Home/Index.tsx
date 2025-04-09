import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import PostCard from '../Partials/PostCard';
import SearchInput from '@/Components/SearchInput';
import Pagination from '@/Components/Pagination';
import useStateRef from 'react-usestateref';
import { url } from 'inspector';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Index({ posts, filters, categories }:any) {
    const [searchParam, setSearchParam, searchParamRef] = useStateRef(filters.searchParam ?? "");
    const [filterCategory, setFilterCategory, filterCategoryRef] = useStateRef(filters.category ?? "");
    const [page, setPage] = useState(filters.page ?? 1);
    const [rowPerPage, setRowPerPage] = useState(filters.perPage ?? 1);
    const [sortBy, setSortBy] = useState(filters.sortBy ?? "name");
    const [sortDirection, setSortDirection] = useState(
        filters.sortDirection ?? "desc"
    );
    console.log('categories', filters);
    function revisitPage() {
        router.get(
           '/',
            {
                page: page,
                rowPerPage: rowPerPage,
                sortBy: sortBy,
                sortDirection: sortDirection,
                searchParam: searchParamRef.current,
                category: filterCategoryRef.current,
            },
            {
                replace: true,
                preserveState: true,
            }
        );
    }

    const handleOnSort = (column: any, direction: any) => {
        if (column && direction) {
            setSortBy(column);
            setSortDirection(direction);
            revisitPage();
        }
    };

    const debouncedHandleSearch = useDebouncedCallback(
        // function
        (value) => {
            setSearchParam(value);
            setPage(1);
            revisitPage();
        },
        // delay in ms
        500
    );

    const resetSearch = () => {
        setSearchParam("");
        setPage(1);
        revisitPage();
    };
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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-2">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold">Blog</h1>
                            <p className="mt-2 text-gray-600">
                                Welcome to our blog! Explore insightful articles, tips, and stories to inspire and inform your journey.
                            </p>
                        </div>
                        <div className="p-6">
                            <div>
                                <h2 className="text-lg font-semibold">Search</h2>
                                <SearchInput
                                    id="search"
                                    className="self-center block w-full"
                                    isFocused
                                    defaultValue={searchParamRef.current}
                                    placeholder={"Search posts..."}
                                    resetSearch={resetSearch}
                                    autoComplete="search"
                                    onChange={(e) =>
                                        debouncedHandleSearch(e.target.value)
                                    } />
                            </div>
                            <h2 className="text-lg font-semibold">Categories</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {categories.map((category: { id: any; slug: any; name:any;}) => (
                                    <button
                                        key={category.id}
                                        className={`px-4 py-2 text-sm font-medium   rounded hover:bg-blue-600 hover:text-white border   ${category.slug === filterCategoryRef.current ? 'bg-blue-700 text-white' : 'text-black border-black'}`}
                                        onClick={() => {
                                            setFilterCategory(category.slug);
                                            setPage(1);
                                            revisitPage();
                                        }}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
                           {posts.data.map((post: { id: any; }) => (
                               <PostCard
                                   key={post.id}
                                   post={post}
                               />
                           ))}
                        </div>
                        <div className="flex justify-center mt-6">
                            <Pagination links={posts?.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
