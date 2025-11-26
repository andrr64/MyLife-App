'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MoreVertical,
  Calendar as CalendarIcon,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// --- DUMMY DATA ---

// Kita asumsikan ini bulan November 2024
const currentMonth = 'November 2024';
const daysInMonth = 30;
const startDayOffset = 5; // Jumat (0=Sun, 1=Mon, ..., 5=Fri)

// Data Tugas Dummy
const tasksData: Record<number, any[]> = {
  1: [
    {
      id: 101,
      title: 'Review Q3 Financial Report',
      time: '09:00 - 10:30',
      type: 'Work',
      priority: 'High',
      color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
      description: 'Analyze the burn rate and prepare slides for the board meeting.'
    },
    {
      id: 102,
      title: 'Lunch with Client (Pak Budi)',
      time: '12:00 - 13:30',
      type: 'Meeting',
      priority: 'Medium',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      location: 'Senayan City'
    },
    {
      id: 103,
      title: 'Design System Sync',
      time: '15:00 - 16:00',
      type: 'Design',
      priority: 'Low',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
      members: [1, 2, 3]
    }
  ],
  5: [
    {
      id: 201,
      title: 'Weekly Standup',
      time: '10:00 - 10:30',
      type: 'Work',
      priority: 'Medium',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    }
  ],
  12: [
    {
      id: 301,
      title: 'Doctor Appointment',
      time: '16:00 - 17:00',
      type: 'Personal',
      priority: 'High',
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    }
  ]
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<number>(1); // Default select tanggal 1

  // Helper untuk generate array hari
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDayOffset }, (_, i) => i);

  const selectedTasks = tasksData[selectedDate] || [];

  return (
    <div className="flex-1 p-8 pt-6 bg-background min-h-screen flex flex-col space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
          <p className="text-muted-foreground">
            Manage your timeline and upcoming deadlines.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="w-40 text-center font-semibold text-lg">{currentMonth}</div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="ml-4 flex gap-2">
            <Button variant="outline">Today</Button>
            <Button><Plus className="mr-2 h-4 w-4" /> Event</Button>
          </div>
        </div>
      </div>

      {/* Main Content: Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

        {/* --- LEFT: CALENDAR GRID (8 Cols) --- */}
        <Card className="lg:col-span-8 flex flex-col h-full shadow-sm">
          <CardHeader className="pb-4">
            {/* Weekday Header */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0">
            <div className="grid grid-cols-7 h-full auto-rows-fr border-t border-l border-border">
              {/* Empty slots for previous month */}
              {emptyDays.map((empty) => (
                <div key={`empty-${empty}`} className="bg-muted/10 border-b border-r border-border min-h-[100px]" />
              ))}

              {/* Days */}
              {daysArray.map((day) => {
                const hasTasks = tasksData[day];
                const isSelected = selectedDate === day;

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`
                        relative border-b border-r border-border p-3 min-h-[120px] cursor-pointer transition-all group hover:bg-accent/50
                        ${isSelected ? 'bg-accent/40 ring-2 ring-primary ring-inset z-10' : ''}
                      `}
                  >
                    {/* Date Number */}
                    <div className={`
                        w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium mb-2
                        ${day === new Date().getDate() ? 'bg-primary text-primary-foreground' : 'text-foreground'}
                      `}>
                      {day}
                    </div>

                    {/* Task Dots/Preview */}
                    <div className="space-y-1.5">
                      {hasTasks?.slice(0, 3).map((task, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${task.color.split(' ')[0].replace('bg-', 'bg-')}`} />
                          <span className="text-[10px] font-medium truncate text-muted-foreground w-full">
                            {task.title}
                          </span>
                        </div>
                      ))}
                      {hasTasks && hasTasks.length > 3 && (
                        <div className="text-[10px] text-muted-foreground pl-3">
                          + {hasTasks.length - 3} more
                        </div>
                      )}
                    </div>

                    {/* Hover Add Button */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* --- RIGHT: TASK SIDEBAR (4 Cols) --- */}
        <div className="lg:col-span-4 flex flex-col h-full gap-4">

          {/* Selected Date Header */}
          <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-primary-foreground/80 font-medium text-sm mb-1">{currentMonth}</p>
                  <h2 className="text-4xl font-bold">{selectedDate}</h2>
                  <p className="text-sm mt-1 opacity-90">
                    {selectedTasks.length} Tasks Scheduled
                  </p>
                </div>
                <div className="p-2 bg-primary-foreground/10 rounded-lg">
                  <CalendarIcon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task List */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Daily Tasks</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 text-xs">Clear All</Button>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {selectedTasks.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                      <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">No tasks for this day</p>
                    <p className="text-xs text-muted-foreground mt-1">Enjoy your free time!</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Plus className="w-3 h-3 mr-2" /> Add Task
                    </Button>
                  </div>
                ) : (
                  selectedTasks.map((task) => (
                    <div key={task.id} className="group flex gap-3 items-start p-3 rounded-lg border border-transparent hover:border-border hover:bg-accent/30 transition-all">

                      {/* Time Column */}
                      <div className="w-12 pt-1 flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-muted-foreground">
                          {task.time.split(' ')[0]}
                        </span>
                        <div className="h-full w-[1px] bg-border my-1 group-last:hidden" />
                      </div>

                      {/* Card Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-5 font-normal ${task.color} border-0`}>
                            {task.type}
                          </Badge>
                          <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold leading-none mb-1.5">{task.title}</h4>
                          {task.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {task.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.time}
                          </div>
                          {task.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {task.location}
                            </div>
                          )}
                        </div>

                        {task.members && (
                          <div className="flex -space-x-2 pt-1">
                            {[1, 2, 3].map(i => (
                              <Avatar key={i} className="w-6 h-6 border-2 border-background">
                                <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </Card>

        </div>

      </div>
    </div>
  );
}