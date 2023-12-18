import { useEffect, useCallback } from "react";
import * as z from "zod";
import { mutate } from "swr";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { updateProduct } from "@/api/api";
import { useToast } from "@/components/ui/use-toast";
import get from "@/api/get";
import { Product } from "../../../core/src/db/schema/product";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
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

  const { reset } = form;

  const resetAsyncForm = useCallback(async () => {
    const result = (await get({
      apiName: "products",
      id: productId,
    })) as Product;
    reset(result);
  }, [productId, reset]);

  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await updateProduct(productId as string, data);
    toast({
      description: "Update Product successfully",
    });
    mutate("/products");
  };

  return (
    <div>
      <Button onClick={() => navigate("/")}>Back</Button>
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
    </div>
  );
};

export default EditProduct;
