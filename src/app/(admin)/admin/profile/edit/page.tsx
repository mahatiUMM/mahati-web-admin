"use client"

import { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePathname } from "next/navigation"
import CustomBreadcrumb from "@/components/layout/custom-breadcrumb"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  usePutProfile,
  useGetProfile,
} from "@/lib/hooks/useUsers"

export default function AdminProfileEditPage() {
  const pathname = usePathname();

  const { data: dataProfile } = useGetProfile();
  const { putData: putProfile } = usePutProfile();

  const formSchema = z.object({
    username: z.string().min(1).max(300),
    email: z.string().email(),
    number: z.string().min(1).max(300),
    image: z.union([z.instanceof(File), z.string().nullable()]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: dataProfile?.data?.username,
      email: dataProfile?.data?.email,
      number: dataProfile?.data?.number,
      image: null,
    },
  });

  useEffect(() => {
    if (dataProfile) {
      form.setValue("username", dataProfile?.data?.username);
      form.setValue("email", dataProfile?.data?.email);
      form.setValue("number", dataProfile?.data?.number);
    }
  }, [dataProfile, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = new FormData();
    payload.append("username", values.username);
    payload.append("email", values.email);
    payload.append("number", values.number);
    if (values.image instanceof File) {
      payload.append("image", values.image);
    }
    putProfile(payload);
  }

  const renderProfileLink = (href: string, label: string) => (
    <Link
      className={`mt-4 inline-flex items-center rounded-md text-sm font-medium hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted hover:underline hover:underline-offset-4 justify-start ${pathname === href ? "underline underline-offset-4" : ""}`}
      href={href}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex flex-col sm:gap-4 sm:py-1 sm:pl-14 m-4">
      <CustomBreadcrumb
        items={[
          { href: "/admin/dashboard", label: "Home" },
          { label: "My Profile" },
        ]}
      />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {renderProfileLink("/admin/profile", "Profile")}
            {renderProfileLink("/admin/profile/edit", "Edit Profile")}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              Update your profile information
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            field.onChange(e.target.files?.[0] || null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col justify-start w-full">
                  <Button type="submit" variant="default" className="mt-8">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}