import ConfirmButton from "@/Components/ConfirmButton";
import { PrimaryLink } from "@/Components/PrimaryButton";
import MasterTable, { TableBody, TableTd } from "@/Components/tables/masterTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";

export default function Index({posts, filters}:any) {
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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Welcome to the Blog Posts section! Here you can manage all the blog posts. Use the table below to view, edit, or delete existing posts, or create a new one using the "Create Post" button.</p>
                        </div>
                        <MasterTable
                            tableColumns={tableColumns}
                            url={"#"}
                            createLink={createLink}
                            search={search}
                            filters={filters}
                            links={posts?.meta?.links}
                        >
                            {posts?.data?.map((category: any) => (
                                <TableBody
                                    buttons={
                                        <>
                                            <PrimaryLink
                                                className="!py-2"
                                                href={route("posts.edit", {
                                                    id: category.id
                                                })}
                                            >
                                                <PencilIcon className="w-5 h-5 mr-4" />
                                                {"Edit"}
                                            </PrimaryLink>
                                            <ConfirmButton
                                                className="!py-2"
                                                url={route("posts.destroy", {
                                                    id: category.id
                                                })}
                                                label="Delete"
                                            />
                                        </>

                                    }
                                    key={category.id}
                                >
                                    <TableTd>{category.id}</TableTd>
                                    <TableTd>{category.name}</TableTd>
                                    <TableTd>{category.slug}</TableTd>
                                    <TableTd>{category.created_at_human}</TableTd>

                                </TableBody>
                            ))}
                        </MasterTable>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
