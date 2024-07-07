import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import React from 'react';

interface ModalProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ 
    title,
    description,
    isOpen,
    onClose,
    children
}) => {
    const handleChange = (open: boolean | null) => {
        if (open === false) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    );
};
