import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateEditModal({ show, setShow, category, type }: any) {
    const modalTitle = type === "create" ? "Create Category" : "Edit Category";
    const { data, setData, errors, post, reset } = useForm({
        name: category?.name ?? "",
        slug: category?.slug ?? "",
        type: type,
        id: category?.id ?? "",
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (type === "edit") {
            post(route("categories.update", { slug: category?.slug }), {
                onSuccess: () => {
                    reset();
                    setShow(false);
                },
            });
        } else {
            post(route("categories.store"), {
                onSuccess: () => {
                    reset();
                    setShow(false);
                },
            });
        };
    };
    return (
        <Modal show={show} onClose={() => reset()}>
            <div className="p-6 text-gray-900 font-semibold">
                {modalTitle}
            </div>
            <form className="p-6 text-gray-900" onSubmit={submit}>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-bold text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="slug"
                        className="block mb-2 text-sm font-bold text-gray-700"
                    >
                        Slug
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={data.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <InputError message={errors.slug} />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => setShow(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    );
};
