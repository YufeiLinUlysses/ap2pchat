package user

import (
	"encoding/json"
	"log"
	"time"
)

//Profile class stores the basic information of a user
type Profile struct {
	Gender     string    `json:"gender, omitempty"`
	Age        int       `json:"age, omitempty"`
	FirstLogin time.Time `json: firstLogin`
	//Avatar
}

//JSON returns json
func (p Profile) JSON() []byte {
	jsonedP, err := json.Marshal(p)
	if err != nil {
		log.Fatal(err)
		return nil
	}
	return jsonedP
}
