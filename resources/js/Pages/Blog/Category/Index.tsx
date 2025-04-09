import ConfirmButton from "@/Components/ConfirmButton";
import PrimaryButton, { PrimaryLink } from "@/Components/PrimaryButton";
import MasterTable, { TableBody, TableTd } from "@/Components/tables/masterTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { useRef, useState } from "react";
import CreateEditModal from "./Partials/CreateEditModal";
import useStateRef from "react-usestateref";

export default function Index({ categories, filters }: any) {
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
            label: "Name",
            sortField: "name",
            sortable: false,
        },
        {
            label: "Slug",
            sortField: "slug",
            sortable: true,
        },
        {
            label: "Created AT",
            sortField: "created_at",
            sortable: true,
        },

    ];

    const search = {
        placeholder: "Search Category...",
    }
    const [show, setShow] = useState(false);
    const [category, setCategory, categoryRef] = useStateRef();
    const [type, setType] = useState("create");
    const modalHandler = (show:any) => {
        setType("create");
        setShow(show);
    }
    const refCategory = useRef(category);
    const createModal = {
        state: modalHandler,
        label: "Create Category",
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Categories
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-2">
                        <div className="p-4 text-gray-900">
                            <h1 className="text-2xl font-bold">Manage All Categories</h1>
                            <p className="mt-2 text-gray-700">
                                Create, edit, and delete categories to organize all blog posts effectively.
                            </p>
                        </div>
                        <MasterTable
                            tableColumns={tableColumns}
                            url={"#"}
                            setModal={createModal}
                            search={search}
                            filters={filters}
                            links={categories?.meta?.links}
                        >
                            {categories?.data?.map((category: any) => (
                                <TableBody
                                    buttons={
                                        <>
                                            <PrimaryButton
                                                className="!py-2"
                                                onClick={() => {
                                                    setCategory(category);
                                                    setType("edit");
                                                    setShow(true);
                                                }
                                                }
                                            >
                                                <PencilIcon className="w-5 h-5 mr-4" />
                                                {"Edit"}
                                            </PrimaryButton>
                                            <ConfirmButton
                                                className="!py-2"
                                                url={route("categories.destroy", {
                                                    slug: category.slug
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
            {show && type == 'edit' &&  <CreateEditModal
                show={show}
                setShow={setShow}
                type={type}
                category={categoryRef.current}
            />}
            {type == 'create' && <CreateEditModal
                show={show}
                setShow={setShow}
                type={type}
            />}
        </AuthenticatedLayout>
    );
};

