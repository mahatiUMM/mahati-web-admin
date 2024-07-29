import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function BloodPressureTable({ pressures }: Readonly<{
  pressures: {
    id: number;
    user_id: number;
    image: string;
    sistol: number;
    diastole: number;
    heartbeat: number;
    created_at: string;
    updated_at: string;
  }[];
}
>) {
  return (
    <Table className="my-4 lg:my-0">
      <TableHeader>
        <TableRow>
          <TableHead className="hidden lg:table-cell">ID</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead className="">Image</TableHead>
          <TableHead className="">Sistol</TableHead>
          <TableHead className="">Diastole</TableHead>
          <TableHead className="">Heartbeat</TableHead>
          <TableHead className="text-left">Created At</TableHead>
          <TableHead className="text-left">Update At</TableHead>
          <TableHead className="text-left">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pressures?.map((pressure: any) => (
          <TableRow key={pressure.id}>
            <TableCell className="hidden lg:table-cell">{pressure.id}</TableCell>
            <TableCell>{pressure.user_id}</TableCell>
            <TableCell>{pressure.image}</TableCell>
            <TableCell>{pressure.sistol}</TableCell>
            <TableCell>{pressure.diastole}</TableCell>
            <TableCell>{pressure.heartbeat}</TableCell>
            <TableCell>{pressure.created_at}</TableCell>
            <TableCell>{pressure.updated_at}</TableCell>
            <TableCell>
              <Button className="rounded-full px-1 py-1" variant={"outline"}>
                <Info />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
