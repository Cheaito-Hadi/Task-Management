<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function addTask(Request $request)
    {
        $dueDate = $request->due_date;
        $status = $this->calculateStatus($dueDate);

        $employeeId = $request->employee_id;

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $dueDate,
            'status' => $status,
            'user_id' => $employeeId,
        ]);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
        ]);
    }

    public function deleteTask($id)
    {

        $deletedTask = Task::find($id);
        if (is_null($deletedTask)) {
            return response()->json(["message" => 'Task not found']);
        }

        $deletedTask->delete();

        return response()->json(['message' => 'Task deleted successfully']);

    }

    public function updateTask(Request $request, $id)
    {
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
        $user = Auth::user();
        $usertypeId = $user->usertype_id;

        if ($usertypeId == 1) {
            $tasks = Task::all();
        } elseif ($usertypeId == 2) {
            $tasks = $user->tasks;
        }
        $tasksWithStatus = $tasks->map(function ($task) {
            $task->status = $this->calculateStatus($task->due_date);
            return $task;
        });

        return response()->json([
            'tasks' => $tasksWithStatus,
        ]);
    }

    public function getAllEmployees()
    {
        $employees = User::where('usertype_id', 2)->get();

        return response()->json([
            'employees' => $employees,
        ]);
    }

    public function toggleStatus($id)
    {
        $task = Task::find($id);

        if (is_null($task)) {
            return response()->json(["message" => 'Task not found']);
        }

        $task->update([
            'status' => $task->status === 'Finished' ? 'In Progress' : 'Finished',
        ]);

        return response()->json([
            'message' => 'Task status toggled successfully',
            'task' => $task,
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
