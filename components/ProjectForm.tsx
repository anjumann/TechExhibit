"use client";
import { SessionInterface } from "@/common.types";
import React from "react";
import Image from "next/image";
import FormField from "./FormField";
type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleStateChange = (fieldName: string, value: string) => {};
  const form = {
    image: "",
    title: "",
    liveSiteUrl:'',
    githubUrl:'',
    description: "",

  };
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            alt="project poster"
            className="sm:p-10 object-contain z-20"
          />
        )}
        {form?.image && (
          <Image
            src={form.image}
            alt="project poster"
            className="sm:p-10 object-contain z-20"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="TechExhibit"
        setState={(value) => handleStateChange("title", value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Quick Intro!!!."
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Hosted URL"
        state={form.liveSiteUrl}
        placeholder="https://tech-exhibit.vercel.app/"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/anjumann/techexhibit"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
    </form>
  );
};

export default ProjectForm;
