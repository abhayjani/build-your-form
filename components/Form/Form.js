import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { createForm } from "../api/create-form";
import { firestore } from "../utils/firebase";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createForm(formData);
      await firestore.collection("forms").add(formData);
      setFormData({ name: "", email: "", message: "" });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Form;

