<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function addTask(Request $request){
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'status' => "not finished",
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
        ]);
    }

    public function deleteTask(Request $request, $id){
        $user = Auth::user();

        $deletedTask= $user->tasks->where('id', $id)->first();
        if (is_null($deletedTask)) {
            return response()->json(["message" => 'Task not found']);
        }

        $deletedTask->delete();

        return response()->json(['message' => 'Task deleted successfully']);

    }

    public function updateTask(Request $request, $id){
        $user = Auth::user();

        $task = $user->tasks->find($id);

        if (is_null($task)) {
            return response()->json(["message" => 'Task not found']);
        }

        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Task updated successfully',
            'task' => $task,
        ]);
    }

    public function getAllTasks(){
        $user = Auth::user();

        $tasks = $user->tasks;

        return response()->json([
            'tasks' => $tasks,
        ]);
    }
}
