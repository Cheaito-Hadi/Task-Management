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
            'status' => $request->status,
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
}