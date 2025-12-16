package db

import (
  "context"
  "gorm.io/driver/sqlite"
  "gorm.io/gorm"
)

/**
 * 函数名小写代表方法是私有的，外部包无法访问
 * 函数名大写代表方法是公有的，外部包可以访问
 * 包括下面的变量名也是一样
 */
type Todo struct { 
	ID string `json:"id"`
	Nama string `json:"name"`
	Description string `json:"description"`
	Completed bool `json:"completed"`
}

// var Todos []Todo

func Init(){
	// 连接数据库
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
      panic("failed to connect database")
    }

    // Migrate the schema
    db.AutoMigrate(&Todo{})
}

func createTodo(todo Todo) error {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		return err
	}
	result := db.Create(&todo)
	return result.Error
}

func getAllTodos() ([]Todo, error) {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	var todos []Todo
	result := db.Find(&todos)
	return todos, result.Error	
}

func updateTodo(todo Todo) error {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		return err
	}
	result := db.Save(&todo)
	return result.Error
}

func deleteTodo(id string) error {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		return err
	}
	result := db.Delete(&Todo{},"id = ?", id)
	return result.Error
}