import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface FileInputProps {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  currentImage?: string;
  onRemove?: () => void;
}

export const CustomFileField = ({
  name,
  label,
  form,
  currentImage,
  onRemove,
}: FileInputProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      {currentImage && (
        <div className="flex items-center gap-2">
          <Image src={currentImage} width={100} height={100} className="rounded-lg" alt={name} />
          <Button type="button" variant="outline" onClick={onRemove}>
            Remove
          </Button>
        </div>
      )}
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            form.setValue(name, e.target.files?.[0] || null);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
