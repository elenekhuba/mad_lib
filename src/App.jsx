import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";


// ისტორიის სიაში არსებული თემები
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


// ვალიდაციის სქემა
const validationSchema = Yup.object({
  topic: Yup.string().oneOf(topics, "Please select a valid topic").required("Topic is required"),
  verb: Yup.string().min(3).max(20).required("Verb is a required field"),
  noun: Yup.string().min(3).max(20).required("Noun is a required field"),
  adjective: Yup.string().min(3).max(20).required("Adjective is a required field"),
  place: Yup.string().min(3).max(20).required("Place is a required field"),
  emotion: Yup.string().min(3).max(15).required("Emotion is a required field"),
  name: Yup.string().min(3).max(20).required("Name is a required field"),
});


// მდგომარეობა შედეგის და არჩეული თემის შესანახად
function App() {
  const [madLibText, setMadLibText] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");


  // ფორმის გაგზავნის ფუნქცია
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("https://api.abcd.ge/mad-libs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setMadLibText(data.text);// მიღებული ტექსტის შენახვა
      setSelectedTopic(values.topic);// მიღებული ტექსტის შენახვა
    } catch (error) {
      console.error("Error submitting Mad Libs:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Mad Libs!</h1>
      {madLibText ? (
        <div className="mad-lib-result">
          <h2 className="selected-topic">{selectedTopic}</h2>
          <div className="story-box">

             {/* ტექსტის დამუშავება და სიტყვების თეთრ ფონზე გამოტანა */}
            {madLibText.split(/(\{.*?\})/).map((part, index) =>
              part.startsWith("{") ? (
                <span key={index} className="highlight">{part.replace(/\{|\}/g, "")}</span>
              ) : (
                part
              )
            )}
          </div>

            {/* ღილაკი, რომელიც აჩვენებს საწყის ფორმას */}
          <button onClick={() => setMadLibText("")} className="try-again-btn">TRY AGAIN!</button>
        </div>
      ) : (
        <Formik
          initialValues={{ topic: "", verb: "", noun: "", adjective: "", place: "", emotion: "", name: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <h2>CHOOSE A STORY</h2>
              <div className="topics">

               {/* თემების არჩევის ღილაკები */}
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
              </div>
              <ErrorMessage name="topic" component="p" className="error" />
              <h2 className="form-title">GO MAD! FILL IN THE BLANK FIELDS BELOW</h2>
              <div className="form">

                 {/* ველების შექმნა ციკლის გამოყენებით */}
                {["verb", "noun", "adjective", "place", "emotion", "name"].map((field) => (
                  <div key={field} className="input-group">
                    <Field name={field} placeholder={`Enter a ${field}`} className="input-field" />
                    <ErrorMessage name={field} component="div" className="error-message" />
                    <div className="input-label">{field.toUpperCase()}</div>
                  </div>
                ))}
              </div>
              <button type="submit" className="create-btn">CREATE!</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default App;
