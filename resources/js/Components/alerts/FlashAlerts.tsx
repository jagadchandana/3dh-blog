import SuccessAlert from "./SuccessAlert";
import { PageProps } from "@/types";
import DangerAlert from "./DangerAlert";

export default function FlashAlerts({ flash }:{flash:PageProps["flash"]}) {
    return (
        <>
            {flash?.success && (
                <SuccessAlert
                    title="Success"
                    message={flash?.success}
                />
            )}

            {flash?.error && (
                <DangerAlert
                    title="Error"
                    message={flash?.error}
                />
            )}
        </>
    );
}
