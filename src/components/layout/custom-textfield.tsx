import { Input } from "@/components/ui/input";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface TextFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  form: UseFormReturn<any>;
}

export const CustomTextField = ({
  name,
  label,
  type = "text",
  placeholder = "",
  form,
}: TextFieldProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input type={type} placeholder={placeholder} {...form.register(name)} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
