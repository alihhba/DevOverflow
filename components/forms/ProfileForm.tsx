"use client";
import { useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/actions/users-action ";
import { profileSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface askQuestionFormProps {
  clerkId: string;
  userData: string;
}

const ProfileForm = ({ clerkId, userData }: askQuestionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  console.log(clerkId);
  const parsedQuestionInfo = JSON.parse(userData || "{}");

  const form = useForm<z.infer<typeof profileSchema>>({
    defaultValues: {
      location: parsedQuestionInfo.location || "",
      portfolioWeb: parsedQuestionInfo.portfolioWeb || "",
      bio: parsedQuestionInfo.bio || "",
    },
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setIsSubmitting(true);

    await updateUser({
      clerkId,
      path: pathname,
      updateData: {
        location: values.location,
        portfolioWeb: values.portfolioWeb,
        bio: values.bio,
      },
    });

    try {
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        form.reset();
      }, 1000);
    }
  };

  return (
    <div className="mt-9">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9"
        >
          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-regular pb-3.5  text-dark-100 dark:text-light-800">
                  Location <span className="text-primary-500">*</span>
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
            name="portfolioWeb"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-regular pb-3.5  text-dark-100 dark:text-light-800">
                  PortfolioWeb <span className="text-primary-500">*</span>
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
            name="bio"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-regular pb-3.5  text-dark-100 dark:text-light-800">
                  Bio <span className="text-primary-500">*</span>
                </FormLabel>

                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    {...field}
                    className="min-h-[56px] rounded-lg border-2 border-light-700 bg-light-800 px-6 py-4 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-dark-400 dark:bg-dark-300"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
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
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
