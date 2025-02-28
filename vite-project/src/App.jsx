import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";

const topics = [
  "THE WEIRDEST DAY AT SCHOOL",
  "ADVENTURE IN THE AMAZON JUNGLE",
  "FANTASY AND IMAGINATION",
  "THE BIRTHDAY PLAN",
  "A RAINY DAY",
  "THE PRINCESS",
  "COOKING SHOW",
  "A HAUNTED HOUSE VISIT",
  "MY SUPERPOWER",
  "THE MOVIE PREMIERE",
  "THE DAY EVERYTHING WENT BACKWARD",
];

const validationSchema = Yup.object({
  topic: Yup.string()
    .oneOf(topics, "Please select a valid topic")
    .required("Topic is required"),
  verb: Yup.string().min(3).max(20).required("Verb is a required field"),
  noun: Yup.string().min(3).max(20).required("Noun is a required field"),
  adjective: Yup.string().min(3).max(20).required("Adjective is a required field"),
  place: Yup.string().min(3).max(20).required("Place is a required field"),
  emotion: Yup.string().min(3).max(15).required("Emotion is a required field"),
  name: Yup.string().min(3).max(20).required("Name is a required field"),
});

function App() {
  return (
    <div className="container">
      <h1>Mad Libs!</h1>
      <h2>CHOOSE A STORY</h2>
      <Formik
        initialValues={{
          topic: "",
          verb: "",
          noun: "",
          adjective: "",
          place: "",
          emotion: "",
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          alert("Mad Lib Created Successfully!");
          resetForm();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="topics">
              {topics.map((topic) => (
                <button
                  type="button"
                  key={topic}
                  className={`topic-btn ${values.topic === topic ? "selected" : ""}`}
                  onClick={() => setFieldValue("topic", topic)}
                >
                  {topic}
                </button>
              ))}
            </div >
            <ErrorMessage name="topic" component="p" className="error" />
            <p>--------</p>
            <h2 className="form-title">GO MAD! FILL IN THE BLANK FIELDS BELOW</h2>
            <div className="form">
              
              {["verb", "noun", "adjective", "place", "emotion", "name"].map((field) => (
                 <div key={field} className="input-group">
                 <Field name={field} placeholder={`Enter a ${field}`} className="input-field" />
                 <ErrorMessage name={field} component="div" className="error-message" />
                 <div className="input-label">{field.toUpperCase()}</div>
               </div>
             ))}
             
             
            </div>
            <button type="submit" className="create-btn">
                CREATE!
              </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;