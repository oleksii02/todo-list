import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
} from '@nextui-org/react';

export const TableDisabled = () => {
  return (
    <>
      <Table className="rounded-2xl border-2 border-primary" color="primary">
        <TableHeader>
          <TableColumn>Task name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Time of creation</TableColumn>
          <TableColumn>Confirm</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Edit</TableColumn>
          <TableColumn>Delete</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"Kindly sign in to use our app!"}>{[]}</TableBody>
      </Table>
    </>
  );
};
