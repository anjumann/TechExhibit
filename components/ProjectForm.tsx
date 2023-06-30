"use client";
import { SessionInterface } from "@/common.types";
import React, { useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { categoryFilters } from "@/constants";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token);
        router.push("/");
      }
    } catch (error) {
      alert(
        `Failed to ${
          type === "create" ? "create" : "edit"
        } a project. Try again!`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image!");

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState({
    image: "",
    title: "",
    liveSiteUrl: "",
    githubUrl: "",
    description: "",
    category: "",
  });

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
            fill
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

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            submitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          submitting={submitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
