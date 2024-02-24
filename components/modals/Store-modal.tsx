"use client";
import React, { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { useStoreModel } from "@/hooks/use-store-modal";

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);
  const profileFormSchema = z.object({
    name: z.string().min(1, {
      message: "name must be at least 1 characters.",
    }),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;
  const defaultValues: Partial<ProfileFormValues> = {
    name: "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setLoading(true);
      console.log(data);
      const response = await axios.post("/api/stores", data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const storeModal = useStoreModel();

  return (
    <>
      <Modal
        title="Create store"
        description="Add anew store"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        <div>
          <div className="space-y-4 pb-2 py-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="E-Commerse" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <div className="flex justify-end items-center space-x-2 w-full">
                    <Button
                      disabled={loading}
                      variant={"outline"}
                      onClick={storeModal.onClose}
                    >
                      Cancle
                    </Button>
                    <Button disabled={loading} type="submit">
                      Continue
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};
