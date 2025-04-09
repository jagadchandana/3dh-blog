import ConfirmButton from "@/Components/ConfirmButton";
import { PrimaryLink } from "@/Components/PrimaryButton";
import MasterTable, { TableBody, TableTd } from "@/Components/tables/masterTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";

export default function Index({ posts, filters }: any) {
    const tableColumns = [
        {
            label: "",
            sortField: "",
            sortable: false,
        },
        {
            label: "ID",
            sortField: "id",
            sortable: true,
        },

        {
            label: "Title",
            sortField: "title",
            sortable: false,
        },
        {
            label: "Featured Image",
            sortField: "featured_image",
            sortable: false,
        },
        {
            label: "Slug",
            sortField: "slug",
            sortable: true,
        },
        {
            label: "Category",
            sortField: "category",
            sortable: false,
        },
        {
            label: "Created AT",
            sortField: "created_at",
            sortable: true,
        },

    ];

    const createLink = {
        url: route("posts.create"),
        label: "Create Post",
    }


    const search = {
        placeholder: "Search post...",
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Posts
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-2">
                        <div className="p-4 text-gray-900">
                            <h1 className="text-2xl font-bold">Manage Your Posts</h1>
                            <p className="mt-2 text-gray-700">
                                Create, edit, and delete blog posts to keep your content up-to-date.
                            </p>
                        </div>
                        <MasterTable
                            tableColumns={tableColumns}
                            url={"#"}
                            createLink={createLink}
                            search={search}
                            filters={filters}
                            links={posts?.meta?.links}
                        >
                            {posts?.data?.map((post: any) => (
                                <TableBody
                                    buttons={
                                        <>
                                            <PrimaryLink
                                                className="!py-2"
                                                href={route("posts.edit", {
                                                    slug: post.slug
                                                })}
                                            >
                                                <PencilIcon className="w-5 h-5 mr-4" />
                                                {"Edit"}
                                            </PrimaryLink>
                                            <ConfirmButton
                                                className="!py-2"
                                                url={route("posts.destroy", {
                                                    slug: post.slug
                                                })}
                                                label="Delete"
                                            />
                                        </>

                                    }
                                    key={post.id}
                                >
                                    <TableTd>{post.id}</TableTd>
                                    <TableTd>{post.title}</TableTd>
                                    <TableTd>
                                        <div className="">
                                            <img
                                                src={post?.featured_image_url}
                                                className="w-10 h-10 rounded-full"
                                            />
                                        </div>
                                    </TableTd>
                                    <TableTd>{post.slug}</TableTd>
                                    <TableTd>{post.category.name}</TableTd>
                                    <TableTd>{post.created_at_human}</TableTd>

                                </TableBody>
                            ))}
                        </MasterTable>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
