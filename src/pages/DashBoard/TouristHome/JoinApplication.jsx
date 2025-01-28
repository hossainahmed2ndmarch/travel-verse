import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const JoinApplication = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [extraSkills, setExtraSkills] = useState([]);
  const [languageSkills, setLanguageSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const addExtraSkill = () => {
    if (newSkill) {
      setExtraSkills([...extraSkills, newSkill]);
      setNewSkill("");
    }
  };

  const addLanguageSkill = () => {
    if (newLanguage) {
      setLanguageSkills([...languageSkills, newLanguage]);
      setNewLanguage("");
    }
  };

  const removeExtraSkill = (index) => {
    setExtraSkills(extraSkills.filter((_, i) => i !== index));
  };

  const removeLanguageSkill = (index) => {
    setLanguageSkills(languageSkills.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    const applicationData = {
      ...data,
      extraSkill: extraSkills,
      languageSkill: languageSkills,
    };

    axiosSecure
      .post("/applications", applicationData) // Adjust your endpoint
      .then((response) => {
        if (response.data.insertedId) {
         reset()
          Swal.fire({
            icon: "success",
            title: "Application Submitted!",
            text: "Your application has been submitted successfully.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "There was an error submitting your application. Please try again.",
        });
      });
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        Join Us As Tour Guide
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        {/* Read-Only Fields */}
        <div className="form-control mb-4">
          <label className="label-text text-xl text-black font-semibold">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full md:w-auto rounded-none border border-primary"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label-text text-xl text-black font-semibold">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full md:w-auto rounded-none border border-primary"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label-text text-xl text-black font-semibold">
            Photo URL
          </label>
          <input
            type="text"
            {...register("photo")}
            defaultValue={user?.photoURL}
            readOnly
            className="input input-bordered w-full md:w-auto rounded-none border border-primary"
          />
        </div>

        {/* Dynamic Language Skills */}
        <div className="form-control mb-4">
          <label className="label-text text-xl text-black font-semibold">
            Language Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Add a language"
              className="flex-1 input input-bordered w-full md:w-auto rounded-none border border-primary"
            />
            <button
              type="button"
              onClick={addLanguageSkill}
              className="btn border-none bg-primary text-light rounded-none hover:text-primary font-bold "
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {languageSkills.map((language, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1"
              >
                {language}
                <button
                  type="button"
                  onClick={() => removeLanguageSkill(index)}
                  className="btn btn-sm btn-error border-none text-light rounded-none hover:text-primary font-bold"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Extra Skills */}
        <div className="form-control mb-4">
          <label className="label-text text-xl text-black font-semibold">
            Extra Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              className="flex-1 input input-bordered w-full md:w-auto rounded-none border border-primary"
            />
            <button
              type="button"
              onClick={addExtraSkill}
              className="btn border-none bg-primary text-light rounded-none hover:text-primary font-bold "
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {extraSkills.map((skill, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeExtraSkill(index)}
                  className="btn btn-sm btn-error border-none text-light rounded-none hover:text-primary font-bold"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Fields */}
        <div className="form-control mb-4">
          <label className="label-text text-xl text-black font-semibold">
            WhatsApp Number
          </label>
          <input
            type="text"
            {...register("whatsapp", { required: true })}
            defaultValue="+1234567890"
            className={`input input-bordered w-full md:w-auto rounded-none border border-primary ${
              errors.whatsapp ? "input-error" : ""
            }`}
          />
          {errors.whatsapp && (
            <span className="text-red-500 text-sm">
              This field is required.
            </span>
          )}
        </div>

        <div className="form-control mb-4">
          <label className="label-text text-xl text-black font-semibold">
            Facebook Profile
          </label>
          <input
            type="url"
            {...register("facebook", { required: true })}
            defaultValue="https://facebook.com/johnsmith"
            className={`input input-bordered w-full md:w-auto rounded-none border border-primary ${
              errors.facebook ? "input-error" : ""
            }`}
          />
          {errors.facebook && (
            <span className="text-red-500 text-sm">
              This field is required.
            </span>
          )}
        </div>

        <div className="form-control mb-4">
          <label className="label-text text-xl text-black font-semibold">
            Application Title
          </label>
          <input
            type="text"
            {...register("applicationTitle", { required: true })}
            placeholder="Enter your application title"
            className={`input input-bordered w-full md:w-auto rounded-none border border-primary ${
              errors.applicationTitle ? "input-error" : ""
            }`}
          />
          {errors.applicationTitle && (
            <span className="text-red-500 text-sm">
              This field is required.
            </span>
          )}
        </div>

        <div className="form-control mb-4">
          <label className="label-text text-xl text-black font-semibold">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            {...register("reason", { required: true })}
            placeholder="Describe your motivation"
            className={`textarea textarea-bordered w-full md:w-auto rounded-none border border-primary ${
              errors.reason ? "textarea-error" : ""
            }`}
          ></textarea>
          {errors.reason && (
            <span className="text-red-500 text-sm">
              This field is required.
            </span>
          )}
        </div>

        <div className="form-control mb-4">
          <label className="label-text text-xl text-black font-semibold">
            CV Link
          </label>
          <input
            type="url"
            {...register("cvLink", { required: true })}
            placeholder="Enter a link to your CV"
            className={`input input-bordered w-full md:w-auto rounded-none border border-primary ${
              errors.cvLink ? "input-error" : ""
            }`}
          />
          {errors.cvLink && (
            <span className="text-red-500 text-sm">
              This field is required.
            </span>
          )}
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn border-none bg-primary text-light rounded-none hover:text-primary font-bold w-full"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinApplication;
