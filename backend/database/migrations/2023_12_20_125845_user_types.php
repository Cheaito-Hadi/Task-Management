<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('extra');
        });
        DB::table('user_types')->insert([
            ['id' => 1, 'name' => 'Employer', 'extra' => ''],
            ['id' => 2, 'name' => 'Employee', 'extra' => ''],
        ]);
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        {
            Schema::dropIfExists('user_types');
        }
    }
};
