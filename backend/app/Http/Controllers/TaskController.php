<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

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
}
