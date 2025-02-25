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
    <div className="min-h-screen mt-12 py-10 px-4 md:px-16 w-full">
      <h2 className="text-4xl font-bold text-center text-primaryText mb-8">
        Join Us As Tour Guide
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-8 mx-auto w-full"
      >
        <div className="grid md:grid-cols-2 gap-5">
          {/* Read-Only Fields */}
        <div className="form-control mb-4">
          <label className="label-text text-xl font-semibold text-secondaryText">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            defaultValue={user?.displayName}
            disabled
            className="input bg-secondaryBg w-full rounded-none border border-primaryText"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label-text text-xl font-semibold text-secondaryText">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            defaultValue={user?.email}
            disabled
            className="input bg-secondaryBg w-full rounded-none border border-primaryText"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label-text text-xl font-semibold text-secondaryText">
            Photo URL
          </label>
          <input
            type="text"
            {...register("photo")}
            defaultValue={user?.photoURL}
            disabled
            className="input bg-secondaryBg w-full rounded-none border border-primaryText"
          />
        </div>

        {/* Dynamic Language Skills */}
        <div className="form-control mb-4">
          <label className="label-text text-xl font-semibold text-secondaryText">
            Language Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Add a language"
              className="flex-1 input md:w-auto rounded-none border bg-secondaryBg w-full border-primaryText"
            />
            <button
              type="button"
              onClick={addLanguageSkill}
              className="btn border-none bg-primary text-light rounded-none hover:text-secondaryBg font-bold bg-primaryText text-secondaryBg hover:bg-primaryText"
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {languageSkills.map((language, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-secondaryBg p-2 rounded-none mb-1"
              >
                {language}
                <button
                  type="button"
                  onClick={() => removeLanguageSkill(index)}
                  className="btn btn-sm btn-error border-none text-secondaryText rounded-none hover:text-secondaryText font-bold"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Extra Skills */}
        <div className="form-control mb-4">
          <label className="label-text text-xl font-semibold text-secondaryText">
            Extra Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              className="flex-1 input md:w-auto rounded-none border bg-secondaryBg w-full border-primaryText"
            />
            <button
              type="button"
              onClick={addExtraSkill}
              className="btn border-none bg-primary text-light rounded-none hover:text-secondaryBg font-bold bg-primaryText text-secondaryBg hover:bg-primaryText"
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {extraSkills.map((skill, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-secondaryBg p-2 rounded-none mb-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeExtraSkill(index)}
                  className="btn btn-sm btn-error border-none text-secondaryText rounded-none hover:text-secondaryText font-bold"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Fields */}
        <div className="form-control mb-4">
          <label className="label-text text-xl font-semibold text-secondaryText">
            WhatsApp Number
          </label>
          <input
            type="text"
            {...register("whatsapp", { required: true })}
            defaultValue="+1234567890"
            className={`input bg-secondaryBg w-full rounded-none border border-primaryText ${
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
          <label className="label-text text-xl font-semibold text-secondaryText">
            Facebook Profile
          </label>
          <input
            type="url"
            {...register("facebook", { required: true })}
            defaultValue="https://facebook.com/johnsmith"
            className={`input bg-secondaryBg w-full rounded-none border border-primaryText ${
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
          <label className="label-text text-xl font-semibold text-secondaryText">
            Application Title
          </label>
          <input
            type="text"
            {...register("applicationTitle", { required: true })}
            placeholder="Enter your application title"
            className={`input bg-secondaryBg w-full rounded-none border border-primaryText ${
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
          <label className="label-text text-xl font-semibold text-secondaryText">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            {...register("reason", { required: true })}
            placeholder="Describe your motivation"
            className={`textarea textarea-bordered w-full md:w-auto bg-secondaryBg rounded-none border border-primaryText${
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
          <label className="label-text text-xl font-semibold text-secondaryText">
            CV Link
          </label>
          <input
            type="url"
            {...register("cvLink", { required: true })}
            placeholder="Enter a link to your CV"
            className={`input bg-secondaryBg w-full rounded-none border border-primaryText ${
              errors.cvLink ? "input-error" : ""
            }`}
          />
          {errors.cvLink && (
            <span className="text-red-500 text-sm">
              This field is required.
            </span>
          )}
        </div>

        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn bg-primaryText text-secondaryBg rounded-none hover:bg-primaryText w-full font-bold"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinApplication;
