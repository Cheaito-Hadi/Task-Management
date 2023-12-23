<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function addTask(Request $request)
    {
        $dueDate = $request->due_date;
        $status = $this->calculateStatus($dueDate);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $dueDate,
            'status' => $status,
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
        ]);
    }

    public function deleteTask($id){

        $deletedTask=Task::find($id);
        if (is_null($deletedTask)) {
            return response()->json(["message" => 'Task not found']);
        }

        $deletedTask->delete();

        return response()->json(['message' => 'Task deleted successfully']);

    }

    public function updateTask(Request $request, $id){

        $taskToUpdate = Task::find($id);

        if (is_null($taskToUpdate)) {
            return response()->json(["message" => 'Task not found']);
        }

        $taskToUpdate->update([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
        ]);

        return response()->json([
            'message' => 'Task updated successfully',
            'task' => $taskToUpdate,
        ]);
    }


    public function getAllTasks()
    {
        $tasks = Task::all();

        $tasksWithStatus = $tasks->map(function ($task) {
            $task->status = $this->calculateStatus($task->due_date);
            return $task;
        });

        return response()->json([
            'tasks' => $tasksWithStatus,
        ]);
    }

    private function calculateStatus($dueDate)
    {
        $currentDate = now();

        if ($dueDate > $currentDate) {
            return 'In Progress';
        }

        return 'Finished';
    }
}
