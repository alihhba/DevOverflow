"use client";
import React, { useRef, useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { EditQuestion, createQuestion } from "@/lib/actions/questsion.actions";
import { questionSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Tag from "../Tag";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";

interface askQuestionFormProps {
  isEdit: boolean;
  mongoUserId: string;
  questionInfo?: string;
}

const AskQuestionForm = ({
  isEdit,
  mongoUserId,
  questionInfo,
}: askQuestionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const editorRef = useRef(null);
  const { toast } = useToast();

  const parsedQuestionInfo = JSON.parse(questionInfo || "{}");

  const form = useForm<z.infer<typeof questionSchema>>({
    defaultValues: {
      title: (questionInfo && parsedQuestionInfo.question.title) || "",
      explanation: (questionInfo && parsedQuestionInfo.question.content) || "",
      tags:
        (questionInfo &&
          parsedQuestionInfo.question.tags.map((tag: any) => tag.name)) ||
        [],
    },
    resolver: zodResolver(questionSchema),
  });

  const onSubmit = async (values: z.infer<typeof questionSchema>) => {
    setIsSubmitting(true);

    try {
      if (isEdit) {
        await EditQuestion({
          title: values.title,
          content: values.explanation,
          path: pathname,
          questionId: parsedQuestionInfo.question._id,
        });

        router.push(`/questions/${parsedQuestionInfo.question._id}`);
        toast({
          title: "question edited",
        });
      } else {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: mongoUserId,
          path: pathname,
        });

        router.push("/");
        toast({
          title: "question submitted",
        });
      }
    } catch (error) {
      console.log(error);
      if (isEdit) {
        toast({
          title: "question not edited",
          variant: "danger",
        });
      } else {
        toast({
          title: "question not submitted",
          variant: "danger",
        });
      }
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        form.reset();
      }, 1000);
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim().replace(/\s+/g, "");

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

  // const handleAddTags = (e: any, field: any) => {
  //   e.preventDefault();

  //   console.log(field);

  //   const tagInput = e.target as HTMLInputElement;
  //   const tagValue = tagInput.value.trim().replace(/\s+/g, "");

  //   if (tagValue !== "") {
  //     if (tagValue.length > 15) {
  //       return form.setError("tags", {
  //         type: "required",
  //         message: "tag must be less than 15 characters",
  //       });
  //     }

  //     if (field.value.length >= 3) {
  //       return form.setError("tags", {
  //         type: "required",
  //         message: "tags can't more than 3.",
  //       });
  //     }

  //     if (!field.value.includes(tagValue as never)) {
  //       form.setValue("tags", [...field.value, tagValue]);
  //       tagInput.value = "";
  //       form.clearErrors("tags");
  //     } else {
  //       tagInput.value = "";
  //       form.clearErrors("tags");
  //     }
  //   } else {
  //     form.trigger();
  //   }
  // };

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
                <FormLabel className="paragraph-regular pb-3.5  text-dark-100 dark:text-light-800">
                  Question Title <span className="text-primary-500">*</span>
                </FormLabel>

                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    className="min-h-[56px] rounded-lg border-2 border-light-700 bg-light-800 px-6 py-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            name="explanation"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-regular pb-3.5  text-dark-100 dark:text-light-800">
                  Detailed explanation of your problem?{" "}
                  <span className="text-primary-500">*</span>
                </FormLabel>

                <FormControl className="bg-light-900 dark:bg-dark-200">
                  <Editor
                    apiKey="mzvmyd8dwbeaazgpywzhogdrybh2o06u5jofhxftb57gy01z"
                    onInit={(evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    initialValue={
                      (questionInfo && parsedQuestionInfo.question.content) ||
                      ""
                    }
                    disabled={isSubmitting}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
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
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-regular pb-3.5  text-dark-100 dark:text-light-800">
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <div className="flex min-h-[56px] rounded-lg border-2 border-light-700 bg-light-800 px-6 py-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300">
                  <FormControl>
                    <Input
                      disabled={isEdit}
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                      className="m-0 border-0  bg-light-800 p-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-dark-300"
                    />
                  </FormControl>
                  {/* <Button
                    type="button"
                    onClick={(e) => handleAddTags(e, field)}
                    >
                    Add
                    </Button> */}
                </div>
                <FormDescription className="body-medium flex text-light-400 dark:text-light-500">
                  {isEdit ? "can't edit tags" : "Press Enter to add tag"}
                </FormDescription>

                <div className="flex items-center gap-2">
                  {field.value.length > 0 &&
                    field.value.map((item) => (
                      <Button
                        disabled={isEdit}
                        onClick={() =>
                          isEdit ? () => {} : handleRemoveTag(item, field)
                        }
                        className="p-0"
                        key={item}
                      >
                        <Tag title={item} id={item} xButton={!isEdit} />
                      </Button>
                    ))}
                </div>

                <FormMessage className="pt-2 text-xs text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="ml-auto min-h-[40px]  w-fit bg-primary-500 font-bold  text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              // eslint-disable-next-line tailwindcss/classnames-order
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isEdit ? (
              "Edit"
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AskQuestionForm;
