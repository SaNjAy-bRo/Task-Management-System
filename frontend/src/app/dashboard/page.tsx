'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Task, User } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!localStorage.getItem('token') || !storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            alert('Failed to delete task');
        }
    };

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await api.put(`/tasks/${id}`, { status });
            const updatedTasks = tasks.map(t => t.id === id ? { ...t, status: status as any } : t);
            setTasks(updatedTasks);
        } catch (err) {
            alert('Failed to update status');
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DONE': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
            case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-4 bg-indigo-500 rounded-full mb-2"></div>
                <p className="text-indigo-500 font-medium">Loading Dashboard...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-10">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 shadow-sm border-b dark:border-slate-700">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">TaskFlow</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-sm text-right hidden sm:block">
                            <p className="text-gray-900 dark:text-white font-medium">{user?.name || 'User'}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">{user?.role}</p>
                        </div>
                        <button
                            onClick={() => { localStorage.clear(); router.push('/login'); }}
                            className="text-gray-500 hover:text-red-600 transition-colors text-sm font-medium"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} assigned
                        </p>
                    </div>
                    <Link href="/tasks/new" className="btn-primary flex items-center gap-2 shadow-lg shadow-indigo-500/30">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Create New Task
                    </Link>
                </div>

                {tasks.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No tasks yet</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">Get started by creating a new task.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-shadow hover:shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{task.title}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border \${getStatusColor(task.status)}`}>
                                            {task.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{task.description || 'No description provided.'}</p>
                                    {user?.role === 'ADMIN' && task.user && (
                                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                                            <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold">
                                                {task.user.email[0].toUpperCase()}
                                            </span>
                                            Created by {task.user.email}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                                    <select
                                        value={task.status}
                                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                        className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="DONE">Done</option>
                                    </select>

                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        title="Delete Task"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
