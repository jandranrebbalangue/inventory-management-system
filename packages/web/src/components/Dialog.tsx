import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import post from "@/api/post";
import { useToast } from "./ui/use-toast";
import { Product } from "@/products/product";

const Modal = ({ label }: { label: string }) => {
  const { toast } = useToast();

  const formSchema = z.object({
    productCode: z.string(),
    productName: z.string(),
    quantity: z.union([z.string(), z.number()]).pipe(z.coerce.number()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productCode: "",
      productName: "",
      quantity: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = (await post({
      apiName: "/products",
      data,
    })) as Product;
    if (result)
      toast({
        description: "Add Product successfully",
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Code</FormLabel>
                  <FormControl>
                    <Input placeholder="product code" {...field} />
                  </FormControl>
                  <FormDescription>This is your product code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="product name" {...field} />
                  </FormControl>
                  <FormDescription>This is your product name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="quantity" {...field} type="number" />
                  </FormControl>
                  <FormDescription>This is your quantity</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;