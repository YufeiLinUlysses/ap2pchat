package main

import(
	"net/http"
	"log"
)

func main(){
	fs := http.FileServer(http.Dir("../public"))
	http.Handle("/", fs)
	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}