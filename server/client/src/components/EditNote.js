import React, { useState } from "react";
import { Form, Icon, Label, Modal } from "semantic-ui-react";

const EditNote = ({ data }) => {
  const [description, setDescription] = useState(data.description);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`http://localhost:5000/notes/${data.nid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Modal
      trigger={
        <Label
          title="Edit"
          as="a"
          size="mini"
          attached="top right"
          color="black"
        >
          <Icon name="edit outline" size="large" />
        </Label>
      }
      header={`Update Blog`}
      content={
        data && (
          <Form
            style={{
              margin: "20px",
            }}
          >
            <h5>Note id: {data.nid}</h5>

            <Form.TextArea
              label="Note:"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Form.Button onClick={(e) => updateDescription(e)}>
              Update
            </Form.Button>
          </Form>
        )
      }
    />
  );
};

export default EditNote;
