'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function NewTaskPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/tasks', { title, description });
            router.push('/dashboard');
        } catch (err) {
            alert('Failed to create task');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:py-24">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-75 sm:opacity-100 transition-all duration-500"></div>
                <div className="relative px-4 py-10 bg-white dark:bg-slate-800 shadow-lg sm:rounded-3xl sm:p-20">

                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">New Task</h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="relative">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wide">Task Title</label>
                                        <input
                                            className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-transparent dark:text-white dark:border-slate-600 transition-colors"
                                            type="text"
                                            placeholder="e.g. Update Documentation"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wide">Description</label>
                                        <textarea
                                            className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 bg-transparent dark:text-white dark:border-slate-600 transition-colors h-24 resize-none"
                                            placeholder="Enter task details..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className="pt-6 flex gap-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-indigo-600 text-white rounded-md px-6 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Creating...' : 'Create Task'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => router.back()}
                                            className="bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300 rounded-md px-6 py-2 hover:bg-gray-200 dark:hover:bg-slate-600 focus:outline-none transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
