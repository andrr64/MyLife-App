import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

type LoadingModalProps = {
    open: boolean;
};

export function LoadingModal({ open }: LoadingModalProps) {
    return (
        <Dialog open={open}>
            <DialogContent
                className="flex flex-col items-center justify-center gap-4 border-none shadow-none bg-background/80 backdrop-blur-sm"
            >
                <Loader2 className="h-12 w-12 animate-spin" />
                <p className="text-lg font-medium">Loading...</p>
            </DialogContent>
        </Dialog>
    );
}
