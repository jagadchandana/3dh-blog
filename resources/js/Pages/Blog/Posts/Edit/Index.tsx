import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Index({ poster, categories }: any) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        title: poster.title,
        slug: poster.slug,
        content: poster.content,
        category_id: poster.category_id,
        featured_image: poster.featured_image,
        id: poster.id,

    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("posts.update", {
            slug: poster.slug
        }))
    };


    const [fileError, setFileError] = useState("");


    const [canCleanPdf, setCanCleanPdf] = useState(false);
    const [pdfArray, setPdfArray] = useState([]);

    const [error, setError] = useState("");
    const maxSize = 2 * 1024 * 1000;
    const { getRootProps: getRootPdfProps, getInputProps: getInputPdfProps } =
        useDropzone({
            accept: {
                "image/*": [],
            },
            multiple: false,
            onDrop: (acceptedFiles: any) => {
                const fileSize = acceptedFiles.reduce(
                    (total: number, file: File) => total + file.size,
                    0
                );
                if (fileSize > maxSize) {
                    setError("The image field must be lower than 2mb.");
                    return [];
                }
                setError("");
                setPdfArray(
                    acceptedFiles.map((file: any) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    )
                );

                setCanCleanPdf(true);

                const firstFile = acceptedFiles[0];
                if (firstFile) {
                    setData(
                        "featured_image",
                        Object.assign(firstFile, {
                            preview: URL.createObjectURL(firstFile),
                        })
                    );
                }
            },
        });

    const pdfThumb = pdfArray.map((file: any) => (
        <div key={file.name}>
            <div className="flex flex-col items-center justify-center ">
                {file?.type == "application/pdf" ? (
                    <iframe src={file.preview} frameBorder="0"></iframe>
                ) : (
                    <img
                        alt={file.name}
                        src={file.preview}
                        width={2000}
                        height={1000}
                        className="object-contain max-h-[750px] max-w-[700px] mx-auto flex items-center justify-center py-5"
                    />
                )}
                <div className="text-xs mb-2 max-w-[200px] mt-2">
                    {file.name}
                </div>
            </div>
        </div>
    ));
    const pdfRemove = (file: any) => {
        const newPdf = [...pdfArray];
        newPdf.splice(file, 1);
        setPdfArray(newPdf);
        setCanCleanPdf(false);
        setError("");
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Post Edit
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
                        <form onSubmit={submit} className="grid mt-8 gap-y-4 p-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <InputLabel
                                        htmlFor="title"
                                        value={"Title"}
                                    />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="block w-full mt-1"
                                        autoComplete="title"
                                        placeholder="Enter Post Title here."
                                        isFocused={true}
                                        onChange={(e: any) => setData("title", e.target.value)}
                                    />

                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="slug"
                                        value={"Slug"}
                                    />
                                    <TextInput
                                        id="slug"
                                        name="slug"
                                        value={data.slug}
                                        className="block w-full mt-1"
                                        autoComplete="slug"
                                        placeholder="Enter Post Slug here."
                                        isFocused={true}
                                        onChange={(e: any) => setData("slug", e.target.value)}
                                    />

                                    <InputError message={errors.slug} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="category_id"
                                        value={"Category"}
                                    />
                                    <SelectInput
                                        className="block w-full mt-1 "
                                        options={categories}
                                        selectedOption={categories.filter((obj: any) => {
                                            return obj.value === data.category_id;
                                        })}
                                        setData={(e: any) => setData('category_id', e)}
                                    />

                                    <InputError message={errors.category_id} className="mt-2" />
                                </div>

                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="featured_image"
                                    value={"Post Image"}
                                />
                                <p className="text-sm">
                                    {"Upload your image here. You can drag and drop the image or click to select a file."}
                                </p>

                                <div className="pt-4">
                                    <div className="w-full">
                                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl  flex items-center h-full w-full min-h-[149px] ">
                                            <div
                                                {...getRootPdfProps({
                                                    className: "dropzone",
                                                })}
                                                className=" p-5 object-cover h-full w-full min-h-[149px] min-w-full cursor-pointer flex rounded-xl bg-gray-100 items-center justify-center"
                                            >
                                                <input
                                                    type="file"
                                                    {...getInputPdfProps()}
                                                />
                                                {pdfArray.length > 0 || data.featured_image?.length > 0 ? (
                                                    pdfThumb
                                                ) : (
                                                    <span className="">
                                                        <img
                                                            alt="pdf-icon"
                                                            src="/assets/empty_image.png"
                                                            width={60}
                                                            height={39}
                                                            className=" object-contain max-h-[100px] max-w-[100px] mx-auto py-1 pt-6"
                                                        />
                                                        <div className="py-3 ">
                                                            <div className="text-[#0C0900] font-[400] text-sm text-[16px] font-inter justify-center text-center items-center mx-auto">
                                                                Drag and drop files here
                                                            </div>
                                                            <div className="flex justify-center pt-5">
                                                                <div className="h-[2px] w-[70px] md:w-[130px] bg-[#66666699] mt-2.5"></div>
                                                                <div className="text-[#66666699] px-3 font-[400] text-sm">
                                                                    or
                                                                </div>
                                                                <div className="h-[2px] w-[70px] md:w-[130px] bg-[#66666699] mt-2.5"></div>
                                                            </div>
                                                            <div className="text-center">
                                                                <button
                                                                    className="px-4 mt-5 bg-[#4B556333] border-2 border-borderColor text-[#0C0900] inline-flex items-center py-2.5 rounded-2xl font-semibold capitalize transition ease-in-out duration-150"
                                                                    type="button"
                                                                >
                                                                    Browse Files
                                                                </button>
                                                            </div>
                                                            <div className="font-[400] text-base text-textGray text-center pt-8 pb-3">
                                                                Maximum file size is
                                                                2MB
                                                            </div>
                                                        </div>
                                                    </span>
                                                )}
                                            </div>
                                            {progress && (
                                                <div className="bg-gray-200">
                                                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                                        <div
                                                            className="bg-primary text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                                            style={{
                                                                width: `${progress.percentage}%`,
                                                            }}
                                                        >
                                                            {" "}
                                                            {progress.percentage}%
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {canCleanPdf && (
                                            <button
                                                className="z-10  mx-auto mt-4 w-[70px] rounded bg-gray-100 py-1 px-2 text-sm text-gray-900 hover:bg-red-50 hover:text-black"
                                                type="button"
                                                onClick={() => pdfRemove(0)}
                                            >
                                                Clean
                                            </button>
                                        )}

                                        {error && (
                                            <div className="mt-2 text-sm text-center text-red-500">
                                                {error}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {fileError && <p className="mt-2 text-red-600">{fileError}</p>}

                                <InputError message={errors?.featured_image} />
                            </div>
                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="content"
                                    value={"Content"}
                                />
                                <TextArea
                                    id="content"
                                    name="content"
                                    value={data.content}
                                    className="block w-full mt-1"
                                    autoComplete="content"
                                    placeholder="Enter Post Content here."
                                    isFocused={true}
                                    rows={10}
                                    onChange={(e: any) => setData("content", e.target.value)}
                                />

                                <InputError message={errors.content} className="mt-2" />
                            </div>

                            <div className="">
                                <p className="font-[600] text-gray-600 text-sm">
                                    {"You may update your post information and wait a few seconds until our system processes your request."}
                                </p>
                                <div className="flex justify-end">
                                    <PrimaryButton className="my-3" disabled={processing || error != ""}>
                                        {'Create'}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

