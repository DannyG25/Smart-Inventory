package antena

import (
	"io"
	"io/ioutil"

	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"
)

func Unmarshal(b io.ReadCloser, v proto.Message, json bool) error {
	body, err := ioutil.ReadAll(b)
	if err != nil {
		return err
	}

	if json {
		return protojson.UnmarshalOptions{
			DiscardUnknown: true,
			AllowPartial:   true,
		}.Unmarshal(body, v)
	}

	return proto.Unmarshal(body, v)
}
