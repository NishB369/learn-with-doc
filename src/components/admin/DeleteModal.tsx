"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}: DeleteModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-xl z-50 overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-red-50 rounded-xl">
                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                {description}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 shadow-sm shadow-red-200 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
