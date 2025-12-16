package main

import (
	"encoding/json"
	"github.com/google/uuid"
	"fmt" 
	"todo/db"
	"log"
	"net/http"
)
/*
func main() {
	fmt.Println("Hello, World!")
	http.Handle("/foo",fooHandler)

	http.Handle("/bar",func(w http.ResponseWriter,r *http.Request){
		fmt.Fprintf(w,"hello handler, %q",http.EscapeString(r.URL.Path))
	})

	// 日志包
	log.Fatal(http.ListenAndServe(":8080", nil))
}

type FooHandler struct{}

func (h FooHandler) ServeHTTP(w http.ResponseWriter,r *http.Request){
	fmt.Fprintf(w,"hello handler, %q",http.EscapeString(r.URL.Path))
}

var fooHandler = FooHandler{}
*/

// 跨域  临时
func enableCors(next http.HandleFunc) http.HandleFunc{
	return func(w http.ResponseWriter,r *http.Request){
		w.Header().Set("Access-Control-Allow-Origin","*")
		w.Header().Set("Access-Control-Allow-Methods","POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers","Content-Type")
		if r,Methods == http.MethodOptions{ 
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w,r)	
	}
}

// 函数入口
func main(){
	// 初始化数据库
	db.Init()

	// create a new todo
	http.HandleFunc("/create",enableCors(handleCreateTodo))

	// get all todos
	http.HandleFunc("/get-all-todos",enableCors(handleGetTodos))

	// update todo
	http.HandleFunc("/update",enableCors(handleUpdateTodo))

	// delete todo
	http.HandleFunc("/delete",enableCors(handleDeleteTodo))

	// 日志包
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleCreateTodo(w http.ResponseWriter,r *http.Request){ 
	// 读取请求参数 := 自动推断变量类型
	params := map[string]string{}
	// 解析参数
	json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		log.Fatal(err)
		w.WriteHandler(http.StatusBadRequest)
		return
	}

	// 处理参数
	name := params["name"]
	description := params["description"]

	// 生成id 这里使用 go get "github.com/google/uuid" 安装uuid包
	id := uuid.New().String()
	var newTodo db.Todo = db.Todo{
		ID: id,
		Nama: name,
		Description: description,
		Completed: false,
	}

	// 存储数据
	// db.Todos = append(db.Todos,newTodo)
	db.createTodo(newTodo)
	if err != nil {
		log.Fatal(err)
		w.WriteHandler(http.StatusInternalServerError)
		return
	}

	// 返回结果
	w.WriteHandler(http.StatusOK)
}

func handleGetTodos(w http.ResponseWriter,r *http.Request){
	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusOK)
	// log.Println("get all todos:" ,db.Todos)
	todos, err := db.getAllTodos()
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// json.NewEncoder(w).Encode(db.Todos)
	json.NewEncoder(w).Encode(todos)

}

func handleUpdateTodo(w http.ResponseWriter,r *http.Request){
	params := map[string]string{}
	// 解析参数
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	id := params["id"]
	completed := params["completed"]
	description := params["description"]
	name := params["name"]
	// 查找并更新todo
	err = db.updateTodo(db.Todo{ID: id,Nama: name,Description: description,Completed: completed == "true"})
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// for index,todo := range db.Todos{
	// 	if todo.ID == id {
	// 		db.Todos[index].name = name
	// 		db.Todos[index].description = description
	// 		db.Todos[index].completed = completed == "true"
	// 		break	
	// 	}
	// }
	w.WriteHeader(http.StatusOK)
}

func handleDeleteTodo(w http.ResponseWriter,r *http.Request){
	params := map[string]string{}
	// 解析参数
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	id := params["id"]
	// 删除todo
	err = db.deleteTodo(id)
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// for index,todo := range db.Todos{
	// 	if todo.ID == id {
	// 		db.Todos = append(db.Todos[:index],db.Todos[index+1:]...)
	// 		break
	// 	}
	// }
	w.WriteHeader(http.StatusOK)
}