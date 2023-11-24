"use client";
import React, { useRef, useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { questionSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Tag from "../Tag";

const AskQuestionForm = ({ isEdit }: { isEdit: boolean }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof questionSchema>>({
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
    resolver: zodResolver(questionSchema),
  });

  const onSubmit = async (values: z.infer<typeof questionSchema>) => {
    setIsSubmitting(true);

    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "tag must be less than 15 characters",
          });
        }

        if (field.value.length >= 3) {
          return form.setError("tags", {
            type: "required",
            message: "tags can't more than 3.",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        } else {
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleRemoveTag = (item: string, field: any) => {
    const newTags = field.value.filter((tag: string) => item !== tag);

    form.setValue("tags", newTags);
  };

  return (
    <div className="mt-9">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9"
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-light-800 text-dark-100  paragraph-regular pb-3.5">
                  Question Title <span className="text-primary-500">*</span>
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    className="px-6 py-4 dark:bg-dark-300 bg-light-800 border-light-700 rounded-1.5 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-2 dark:border-dark-400 min-h-[56px]"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name="explanation"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-light-800 text-dark-100  paragraph-regular pb-3.5">
                  Detailed explanation of your problem?{" "}
                  <span className="text-primary-500">*</span>
                </FormLabel>

                <FormControl className="bg-light-900 dark:bg-dark-200">
                  <Editor
                    apiKey="mzvmyd8dwbeaazgpywzhogdrybh2o06u5jofhxftb57gy01z"
                    onInit={(evt, editor) =>
                      //@ts-ignore
                      (editorRef.current = editor)
                    }
                    initialValue=""
                    onChange={(e) =>
                      form.setValue("explanation", e.target.getContent())
                    }
                    // onSubmit={(e) => (e.target.value = "")}
                    init={{
                      height: 360,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat",
                      content_style:
                        "body { font-family:intel; font-size:16px } ",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-light-800 text-dark-100  paragraph-regular pb-3.5">
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <div className="flex px-6 py-2 dark:bg-dark-300 bg-light-800 border-light-700 rounded-1.5 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-2 dark:border-dark-400 min-h-[56px] rounded-lg">
                  <FormControl>
                    <Input
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                      className="dark:bg-dark-300 bg-light-800  outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0 p-0 m-0"
                    />
                  </FormControl>
                </div>
                <FormDescription className="flex body-medium dark:text-light-500 text-light-400">
                  Press Enter to add tag
                </FormDescription>

                <div className="flex items-center gap-2">
                  {field.value.length > 0 &&
                    field.value.map((item) => (
                      <div
                        onClick={() => handleRemoveTag(item, field)}
                        className=""
                        key={item}
                      >
                        <Tag title={item} id={item} xButton />
                      </div>
                    ))}
                </div>

                <FormMessage className="text-red-500 text-xs pt-2" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="min-h-[40px] bg-primary-500  w-fit text-bold text-light-900  ml-auto"
            disabled={isSubmitting}
          >
            {isEdit ? "Edit" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AskQuestionForm;
