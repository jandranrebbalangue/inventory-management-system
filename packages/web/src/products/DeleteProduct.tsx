import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteProduct } from "@/api/api";
import { mutate } from "swr";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const DeleteProduct = ({ productId }: { productId: string }) => {
  const { toast } = useToast();
  const deleteProductt = async (productId: string) => {
    await deleteProduct(productId);
    mutate("/products");
    toast({ description: "Delete Product successfully" });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Link to={``}>Delete</Link>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              product. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button onClick={() => deleteProductt(productId)}>Yes</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteProduct;
