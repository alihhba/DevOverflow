/* eslint-disable tailwindcss/classnames-order */
"use client";

import { answerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { usePathname, useRouter } from "next/navigation";
import { CreateAnswer, EditAnswer } from "@/lib/actions/answer-action";
import { useToast } from "../ui/use-toast";

interface props {
  author: string;
  question?: string;
  edit?: boolean;
  answer?: string;
}

const AnswerForm = ({ author, question, edit, answer }: props) => {
  const pathname = usePathname();
  const router = useRouter();
  const editorRef = useRef(null);
  const { theme } = useTheme();
  const [submitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const parsedAnswer = answer ? JSON.parse(answer) || "" : "";

  // console.log(parsedAnswer);
  const form = useForm<z.infer<typeof answerSchema>>({
    defaultValues: {
      answer: parsedAnswer.content || "",
    },
    resolver: zodResolver(answerSchema),
  });
  const onSubmit = async (values: z.infer<typeof answerSchema>) => {
    try {
      setIsSubmitting(true);

      if (edit) {
        await EditAnswer({
          id: parsedAnswer._id,
          content: values.answer,
          path: pathname,
        });

        router.push(`/questions/${parsedAnswer.question}/#${parsedAnswer._id}`);
        toast({
          title: "Answer Edited",
        });
      } else {
        await CreateAnswer({
          path: pathname,
          author: JSON.parse(author),
          content: values.answer,
          question: JSON.parse(question!),
        });

        toast({
          title: "Answer created",
        });
      }

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }
    } catch (error) {
      console.log(error);

      if (edit) {
        toast({
          title: "Answer not Edited",
          variant: "danger",
        });
      } else {
        toast({
          title: "Answer not Submitted",
          variant: "danger",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between  md:mt-10 mb-4">
        <p className="paragraph-semibold text-dark-100 dark:text-light-800">
          Answer a question
        </p>

        {!edit && (
          <Button className="bg-light-800 border-[1px] rounded-lg border-light-700  dark:border-dark-300 dark:bg-dark-400  text-primary-500 py-[10px] px-[16px]">
            Ask from AI
          </Button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="answer"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl className="bg-light-900 dark:bg-dark-200">
                  <Editor
                    apiKey="mzvmyd8dwbeaazgpywzhogdrybh2o06u5jofhxftb57gy01z"
                    onInit={(evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue={parsedAnswer.content || ""}
                    // onSubmit={(e) => (e.target.value = "")}
                    init={{
                      height: edit ? 600 : 360,
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

          <div className="w-full flex items-end mt-4">
            <Button
              type="submit"
              className="px-4 py-3 bg-primary-500 ml-auto text-light-850 "
            >
              {!submitting ? (
                "Submit"
              ) : (
                <Loader2 className="w-4 h-4 animate-spin text-light-900" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
