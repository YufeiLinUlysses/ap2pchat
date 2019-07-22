package user

import (
	"encoding/json"
	"log"
	"time"
)

//User class, contains all necessary information from a user
type User struct {
	Username string    `json:"username"`
	Passwd   string    `json:"passwd"`
	Key      string    `json:"key"`
	login    time.Time `json:"login, omitempy"`
	Profile  `json:"profile"`
}

//JSON returns json
func (u User) JSON() []byte {
	jsonedP, err := json.Marshal(u)
	if err != nil {
		log.Fatal(err)
		return nil
	}
	return jsonedP
}
