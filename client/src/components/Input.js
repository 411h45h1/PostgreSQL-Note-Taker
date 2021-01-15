import React, { useState } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import { Media } from "../config/media";

const Input = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Media at="mobile">
        <Form onSubmit={onSubmitForm} style={{ width: "100%" }}>
          <Form.Field
            maxLength="255"
            label="Note:"
            control={TextArea}
            placeholder="Write your note here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit">add</Button>
        </Form>
      </Media>
      <Media greaterThanOrEqual="tablet">
        <Form onSubmit={onSubmitForm} style={{ width: "35vw" }}>
          <Form.Field
            maxLength="255"
            label="Note:"
            control={TextArea}
            placeholder="Write your note here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit">add</Button>
        </Form>
      </Media>
    </>
  );
};

export default Input;
