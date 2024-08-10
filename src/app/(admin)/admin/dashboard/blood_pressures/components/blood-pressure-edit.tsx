import { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { CustomSelect } from "@/components/layout/custom-select";
import { CustomTextField } from "@/components/layout/custom-textfield";
import { CustomFileField } from "@/components/layout/custom-filefield";
import { usePutBloodPressure } from "@/lib/hooks/useBloodPressures";
import { Button } from "@/components/ui/button";

export default function BloodPressureFormEdit({
  pressure,
  fetchUsers,
  refetchPressure,
  closeDialog
}: Readonly<{
  pressure: any;
  fetchUsers: any;
  refetchPressure: () => void;
  closeDialog: () => void;
}>) {
  const formSchema = z.object({
    user_id: z.string().min(1).max(300),
    image: z.instanceof(File).nullable(),
    sistol: z.string().min(2).max(300),
    diastole: z.string().min(2).max(300),
    heartbeat: z.string().min(2).max(300),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      image: undefined,
      sistol: "",
      diastole: "",
      heartbeat: "",
    },
  });

  useEffect(() => {
    if (pressure) {
      form.setValue("user_id", pressure?.data?.user_id.toString());
      form.setValue("sistol", pressure?.data?.sistol.toString());
      form.setValue("diastole", pressure?.data?.diastole.toString());
      form.setValue("heartbeat", pressure?.data?.heartbeat.toString());
    };
  }, [pressure, form]);

  const { putData: updateBloodPressure } = usePutBloodPressure();

  const options = fetchUsers?.map((user: any) => ({
    value: user.id.toString(),
    label: user.username,
  })) || [];

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("user_id", values.user_id);
    formData.append("sistol", values.sistol);
    formData.append("diastole", values.diastole);
    formData.append("heartbeat", values.heartbeat);
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }
    await updateBloodPressure(pressure.data.id, formData);
    refetchPressure();
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <CustomSelect
          name="user_id"
          label="Select User"
          options={options}
          form={form}
          placeholder="Select a user"
        />
        <CustomFileField
          name="image"
          label="Upload Image"
          form={form}
          currentImage={`https://mahati.xyzuan.my.id/${pressure?.data?.image}`}
          onRemove={() => form.setValue("image", null)}
        />
        <CustomTextField
          name="sistol"
          label="Sistol"
          type="number"
          placeholder="Sistol"
          form={form}
        />
        <CustomTextField
          name="diastole"
          label="Diastole"
          type="number"
          placeholder="Diastole"
          form={form}
        />
        <CustomTextField
          name="heartbeat"
          label="Heartbeat"
          type="number"
          placeholder="Heartbeat"
          form={form}
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button type="submit" variant="default" >
            Save
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
