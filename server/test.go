package main

import (
	"fmt"
	"time"

	"./user"
)

func test() {
	tP := user.Profile{Gender: "male", Age: 2}
	tP.FirstLogin = time.Now()
	test := user.User{Username: "hi", Passwd: "hhh", Key: "hhhhd", Profile: tP}
	fmt.Printf("%s\n", test.JSON())
	fmt.Println(time.Now())
}
