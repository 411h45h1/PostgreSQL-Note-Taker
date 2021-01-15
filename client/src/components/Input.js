import React, { useState } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";

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
    <Form onSubmit={onSubmitForm} style={{ width: "35%" }}>
      <Form.Field
        label="Note:"
        control={TextArea}
        placeholder="Write your note here"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit">add</Button>
    </Form>
  );
};

export default Input;
