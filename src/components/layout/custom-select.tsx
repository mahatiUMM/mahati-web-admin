import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface CustomSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  form: UseFormReturn<any>;
  placeholder?: string;
}

export const CustomSelect = ({
  name,
  label,
  options,
  form,
  placeholder = "Select an option",
}: CustomSelectProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Select
          onValueChange={(value) => form.setValue(name, value)}
          value={form.watch(name) || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
