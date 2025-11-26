'use client';

import React, { useState } from 'react';
import {
    Star,
    Calendar,
    CheckCircle2,
    Circle,
    Plus,
    Trash2,
    Flag,
    Search,
    AlertCircle,
    ListTodo,
    CalendarDays,
    Layout,
    Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// --- DUMMY DATA ---

type Task = {
    id: string;
    title: string;
    description: string;
    date: string; // YYYY-MM-DD
    status: 'todo' | 'completed';
    priority: 'low' | 'medium' | 'high';
    isStarred: boolean;
    project: string;
    subtasks: { id: string; title: string; completed: boolean }[];
};

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Finalize Q3 Budget Report',
        description: 'Need to review the marketing spend and adjust the forecast for Q4. Check with Sarah for the latest numbers.',
        date: '2024-11-26', // Today
        status: 'todo',
        priority: 'high',
        isStarred: true,
        project: 'Finance',
        subtasks: [
            { id: 's1', title: 'Export data from Xero', completed: true },
            { id: 's2', title: 'Create pivot tables', completed: false },
        ],
    },
    {
        id: '2',
        title: 'Design System Update',
        description: 'Update the button components to match the new accessibility guidelines.',
        date: '2024-11-26',
        status: 'todo',
        priority: 'medium',
        isStarred: false,
        project: 'Design',
        subtasks: [],
    },
    {
        id: '3',
        title: 'Call Insurance Agent',
        description: 'Renew the car insurance policy before it expires next week.',
        date: '2024-11-27',
        status: 'todo',
        priority: 'low',
        isStarred: false,
        project: 'Personal',
        subtasks: [],
    },
    {
        id: '4',
        title: 'Weekly Team Sync',
        description: 'Discuss the roadmap for the next sprint.',
        date: '2024-11-28',
        status: 'completed',
        priority: 'medium',
        isStarred: false,
        project: 'Office',
        subtasks: [],
    },
];

// --- COMPONENTS ---

export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(initialTasks[0].id);
    const [filter, setFilter] = useState<'today' | 'week' | 'all' | 'starred'>('today');

    // Logic Filtering
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'starred') return task.isStarred;

        // Simple date logic for demo (Assuming Today is 2024-11-26)
        const today = '2024-11-26';
        if (filter === 'today') return task.date === today;
        if (filter === 'week') return task.date >= today;
        return true;
    });

    const selectedTask = tasks.find((t) => t.id === selectedTaskId);

    // Handlers (Dummy)
    const toggleTaskStatus = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'todo' ? 'completed' : 'todo' } : t));
    };

    const toggleStar = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setTasks(tasks.map(t => t.id === id ? { ...t, isStarred: !t.isStarred } : t));
    };

    return (
        <div className="flex flex-col h-[calc(100vh-1rem)] p-4 md:p-6 bg-background space-y-4">

            {/* 1. Page Header (Judul Halaman di luar container) */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Task Manager</h2>
                    <p className="text-muted-foreground text-sm">Stay organized and focused.</p>
                </div>
                <Button><Plus className="w-4 h-4 mr-2" /> New List</Button>
            </div>

            {/* 2. Main Container (Membungkus 3 Kolom) */}
            <div className="flex-1 flex border rounded-xl overflow-hidden shadow-sm bg-card ring-1 ring-border/50">

                {/* --- KOLOM 1: FILTER (Navigation Pane) --- */}
                {/* Menggunakan background halus (muted/30) agar terlihat seperti panel navigasi, bukan sidebar utama */}
                <div className="w-[220px] bg-muted/30 border-r border-border/60 flex flex-col p-3 hidden md:flex">
                    <div className="space-y-1">
                        <Button
                            variant={filter === 'today' ? 'secondary' : 'ghost'}
                            size="sm"
                            className={cn("w-full justify-start font-normal", filter === 'today' && "bg-white dark:bg-accent shadow-sm")}
                            onClick={() => setFilter('today')}
                        >
                            <ListTodo className="w-4 h-4 mr-2 text-blue-500" /> My Day
                        </Button>
                        <Button
                            variant={filter === 'week' ? 'secondary' : 'ghost'}
                            size="sm"
                            className={cn("w-full justify-start font-normal", filter === 'week' && "bg-white dark:bg-accent shadow-sm")}
                            onClick={() => setFilter('week')}
                        >
                            <CalendarDays className="w-4 h-4 mr-2 text-violet-500" /> Next 7 Days
                        </Button>
                        <Button
                            variant={filter === 'starred' ? 'secondary' : 'ghost'}
                            size="sm"
                            className={cn("w-full justify-start font-normal", filter === 'starred' && "bg-white dark:bg-accent shadow-sm")}
                            onClick={() => setFilter('starred')}
                        >
                            <Star className="w-4 h-4 mr-2 text-yellow-500" /> Important
                        </Button>
                        <Button
                            variant={filter === 'all' ? 'secondary' : 'ghost'}
                            size="sm"
                            className={cn("w-full justify-start font-normal", filter === 'all' && "bg-white dark:bg-accent shadow-sm")}
                            onClick={() => setFilter('all')}
                        >
                            <Layers className="w-4 h-4 mr-2 text-gray-500" /> All Tasks
                        </Button>
                    </div>

                    <Separator className="my-4" />

                    <div className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Projects</div>
                    <div className="space-y-1">
                        {['Office', 'Personal', 'Finance', 'Design'].map(proj => (
                            <Button key={proj} variant="ghost" size="sm" className="w-full justify-start h-8 text-sm font-normal text-muted-foreground hover:text-foreground">
                                <span className="w-2 h-2 rounded-full bg-primary/20 mr-2" /> {proj}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* --- KOLOM 2: TASK LIST (Content Area) --- */}
                <div className="flex-1 flex flex-col min-w-0 bg-background">
                    {/* Header List */}
                    <div className="h-14 px-4 border-b border-border/60 flex items-center justify-between">
                        <h3 className="font-semibold text-base capitalize flex items-center gap-2">
                            {filter === 'starred' ? 'Important' : filter.replace('-', ' ')}
                            <Badge variant="secondary" className="text-xs font-normal h-5 px-1.5">{filteredTasks.length}</Badge>
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                                <Input placeholder="Search" className="w-48 pl-8 h-8 text-xs bg-muted/20" />
                            </div>
                        </div>
                    </div>

                    {/* List Content */}
                    <ScrollArea className="flex-1">
                        <div className="p-3 space-y-2">
                            {filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => setSelectedTaskId(task.id)}
                                    className={cn(
                                        "group flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                                        selectedTaskId === task.id
                                            ? "bg-accent/40 border-primary/20 shadow-sm"
                                            : "bg-card border-transparent hover:bg-accent/30 hover:border-border/50",
                                        task.status === 'completed' && "opacity-60 grayscale"
                                    )}
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleTaskStatus(task.id); }}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {task.status === 'completed' ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        ) : (
                                            <Circle className="w-5 h-5" />
                                        )}
                                    </button>

                                    <div className="flex-1 min-w-0">
                                        <p className={cn(
                                            "text-sm font-medium truncate transition-all",
                                            task.status === 'completed' && "line-through text-muted-foreground"
                                        )}>
                                            {task.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                                            <span className={cn(task.priority === 'high' && "text-red-500 font-medium")}>
                                                {task.priority === 'high' && "High Priority • "}
                                                {task.project}
                                            </span>
                                        </div>
                                    </div>

                                    <button onClick={(e) => toggleStar(task.id, e)}>
                                        <Star className={cn(
                                            "w-4 h-4 transition-colors",
                                            task.isStarred ? "fill-yellow-400 text-yellow-400" : "text-border hover:text-yellow-400"
                                        )} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="p-3 border-t bg-muted/5">
                        <Button variant="outline" className="w-full justify-start text-muted-foreground border-dashed">
                            <Plus className="w-4 h-4 mr-2" /> Add a task
                        </Button>
                    </div>
                </div>

                {/* --- KOLOM 3: DETAIL (Right Panel) --- */}
                {selectedTask ? (
                    <div className="w-[350px] border-l border-border/60 bg-background/50 flex flex-col h-full overflow-hidden">
                        <ScrollArea className="flex-1">
                            <div className="p-5 space-y-6">

                                {/* Header Detail */}
                                <div className="flex items-start gap-3">
                                    <button onClick={() => toggleTaskStatus(selectedTask.id)} className="mt-1.5">
                                        {selectedTask.status === 'completed' ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </button>
                                    <Textarea
                                        className="flex-1 min-h-[40px] bg-transparent border-none resize-none text-lg font-semibold p-0 focus-visible:ring-0 leading-tight"
                                        defaultValue={selectedTask.title}
                                    />
                                    <button onClick={(e) => toggleStar(selectedTask.id, e)} className="mt-1.5">
                                        <Star className={cn(
                                            "w-5 h-5",
                                            selectedTask.isStarred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                        )} />
                                    </button>
                                </div>

                                {/* Subtasks */}
                                <div className="space-y-2">
                                    {selectedTask.subtasks.map(st => (
                                        <div key={st.id} className="flex items-center gap-2 group p-1.5 -mx-1.5 rounded-md hover:bg-accent/50 transition-colors">
                                            <div className={`w-3.5 h-3.5 border rounded-full cursor-pointer flex items-center justify-center ${st.completed ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                                                {st.completed && <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />}
                                            </div>
                                            <span className={`text-sm flex-1 ${st.completed ? 'line-through text-muted-foreground' : ''}`}>{st.title}</span>
                                            <Trash2 className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-pointer hover:text-red-500" />
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-2 text-primary text-sm font-medium cursor-pointer hover:underline pl-1 mt-2">
                                        <Plus className="w-4 h-4" /> Add step
                                    </div>
                                </div>

                                <Separator />

                                {/* Properties */}
                                <div className="space-y-1">
                                    <Button variant="ghost" className="w-full justify-start h-9 px-2 text-sm font-normal text-muted-foreground hover:text-foreground">
                                        <Calendar className="w-4 h-4 mr-3" />
                                        {selectedTask.date === '2024-11-26' ? 'Due Today' : `Due ${selectedTask.date}`}
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start h-9 px-2 text-sm font-normal text-muted-foreground hover:text-foreground">
                                        <AlertCircle className="w-4 h-4 mr-3" />
                                        Priority: <span className="capitalize ml-1 text-foreground">{selectedTask.priority}</span>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start h-9 px-2 text-sm font-normal text-muted-foreground hover:text-foreground">
                                        <Flag className="w-4 h-4 mr-3" />
                                        Project: <span className="ml-1 text-foreground">{selectedTask.project}</span>
                                    </Button>
                                </div>

                                <Separator />

                                {/* Notes Area */}
                                <div className="space-y-2">
                                    <Textarea
                                        className="min-h-[150px] bg-muted/30 border-none focus-visible:ring-1 resize-none text-sm"
                                        placeholder="Add extra notes here..."
                                        defaultValue={selectedTask.description}
                                    />
                                </div>
                            </div>
                        </ScrollArea>

                        <div className="p-3 border-t flex justify-between items-center text-xs text-muted-foreground bg-muted/10">
                            <span>Created yesterday</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="w-[350px] border-l border-border/60 bg-muted/5 flex items-center justify-center text-muted-foreground/50">
                        <div className="text-center">
                            <ListTodo className="w-16 h-16 mx-auto mb-2 opacity-20" />
                            <p className="text-sm font-medium">No task selected</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}