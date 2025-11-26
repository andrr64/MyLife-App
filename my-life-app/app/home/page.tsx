'use client';

import React from 'react';
import {
    Calendar as CalendarIcon,
    CheckCircle2,
    Clock,
    Activity,
    MoreHorizontal,
    Plus,
    ArrowRight,
    Focus,
    Zap,
    Coffee,
    Moon,
    Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- DUMMY DATA ---

const upcomingEvents = [
    {
        id: 1,
        title: 'Daily Standup',
        time: '10:00 AM',
        duration: '30m',
        type: 'Work',
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    },
    {
        id: 2,
        title: 'Lunch with Sarah',
        time: '12:30 PM',
        duration: '1h',
        type: 'Personal',
        color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    },
    {
        id: 3,
        title: 'Project Review',
        time: '02:00 PM',
        duration: '1.5h',
        type: 'Work',
        color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    },
    {
        id: 4,
        title: 'Gym Session',
        time: '05:30 PM',
        duration: '1h',
        type: 'Health',
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    },
];

const priorityTasks = [
    { id: 1, title: 'Finalize presentation deck', project: 'Office', completed: false },
    { id: 2, title: 'Pay electricity bill', project: 'Personal', completed: false },
    { id: 3, title: 'Review PR #402', project: 'Dev', completed: true },
    { id: 4, title: 'Call insurance agent', project: 'Finance', completed: false },
];

const habits = [
    { id: 1, icon: Coffee, label: 'No Caffeine', progress: 100, target: '1/1' },
    { id: 2, icon: Zap, label: 'Workout', progress: 0, target: '0/45m' },
    { id: 3, icon: Moon, label: 'Sleep 7h', progress: 85, target: '6.5/7h' },
];

// Helper greeting
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
};

function Page() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6 bg-background min-h-screen">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {getGreeting()}, Andreas! 👋
                    </h2>
                    <p className="text-muted-foreground">
                        Here's what's happening in your life today.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Task
                    </Button>
                </div>
            </div>

            {/* Tabs untuk switch context dashboard */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="productivity" disabled>Productivity</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">

                    {/* 1. KPI Cards (Top Row) */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Tasks Left</CardTitle>
                                <Target className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    You completed 3 tasks today.
                                </p>
                                <Progress value={60} className="mt-3 h-1" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Next Event</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold truncate">10:00 AM</div>
                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                    Daily Standup Meeting
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Focus Time</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4h 12m</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    <span className="text-emerald-500 font-medium">+12%</span> vs yesterday
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Daily Budget</CardTitle>
                                <div className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300">Safe</div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Rp 150k</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Left from Rp 200k limit
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 2. Main Grid Layout */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                        {/* Left Column (Agenda & Chart) - Takes 4 cols */}
                        <div className="col-span-4 space-y-4">

                            {/* Productivity Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Weekly Productivity</CardTitle>
                                    <CardDescription>Based on completed tasks & focus hours.</CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <div className="h-[200px] w-full flex items-end justify-between px-4 gap-4">
                                        {[65, 40, 80, 55, 90, 30, 70].map((h, i) => (
                                            <div key={i} className="group relative flex flex-col items-center gap-2 w-full">
                                                <div
                                                    className="w-full bg-indigo-500/20 hover:bg-indigo-500 dark:bg-indigo-500/30 dark:hover:bg-indigo-500 transition-all duration-300 rounded-md"
                                                    style={{ height: `${h}%` }}
                                                />
                                                <span className="text-xs text-muted-foreground font-medium">
                                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Today's Schedule */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Today's Schedule</CardTitle>
                                        <CardDescription>You have 4 events remaining.</CardDescription>
                                    </div>
                                    <Button variant="ghost" size="sm">View Calendar <ArrowRight className="ml-2 w-4 h-4" /></Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {upcomingEvents.map((event, i) => (
                                            <div key={event.id} className="flex items-start group">
                                                {/* Time Column */}
                                                <div className="w-20 pt-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                                    {event.time}
                                                </div>

                                                {/* Content Column */}
                                                <div className="flex-1 pb-4 border-l border-border pl-4 relative">
                                                    {/* Timeline Dot */}
                                                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-primary transition-colors" />

                                                    <div className={`p-3 rounded-lg border ${i === 0 ? 'bg-accent/50 border-primary/20' : 'bg-background border-border'} hover:shadow-sm transition-all`}>
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h4 className="font-semibold text-sm">{event.title}</h4>
                                                            <Badge variant="secondary" className="text-[10px] h-5">{event.duration}</Badge>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${event.color}`}>
                                                                {event.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                        </div>

                        {/* Right Column (Tasks & Habits) - Takes 3 cols */}
                        <div className="col-span-3 space-y-4">

                            {/* Task List */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-base">Priority Tasks</CardTitle>
                                    <MoreHorizontal className="w-4 h-4 text-muted-foreground cursor-pointer" />
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {priorityTasks.map((task) => (
                                        <div key={task.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors group">
                                            <button className={`mt-0.5 ${task.completed ? 'text-emerald-500' : 'text-muted-foreground hover:text-primary'}`}>
                                                <CheckCircle2 className="w-5 h-5" />
                                            </button>
                                            <div className="flex-1 space-y-1">
                                                <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                    {task.title}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-[10px] h-5 font-normal text-muted-foreground">
                                                        {task.project}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground mt-2">
                                        + Add Quick Task
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Habit Tracker */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Daily Habits</CardTitle>
                                    <CardDescription>Streak: 5 days 🔥</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    {habits.map((habit) => (
                                        <div key={habit.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-secondary rounded-full">
                                                    <habit.icon className="w-4 h-4 text-foreground" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-medium">{habit.label}</p>
                                                    <p className="text-xs text-muted-foreground">{habit.target}</p>
                                                </div>
                                            </div>
                                            <div className="w-16 text-right">
                                                {habit.progress === 100 ? (
                                                    <Badge className="bg-emerald-500 hover:bg-emerald-600 h-6">Done</Badge>
                                                ) : (
                                                    <div className="text-xs font-bold text-muted-foreground">{habit.progress}%</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Quick Quote / Motivation */}
                            <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
                                <CardContent className="p-6">
                                    <p className="text-sm font-medium opacity-90 leading-relaxed italic">
                                        "The secret of your future is hidden in your daily routine."
                                    </p>
                                    <p className="text-xs mt-2 opacity-75">— Mike Murdock</p>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Page;