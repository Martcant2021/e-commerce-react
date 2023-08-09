import React ,{ useState } from "react";
import { deleteProduct } from "../services/ProductsApi";
import { useMutation, useQueryClient } from "react-query";

const DeleteProduct = ({productId})=>{
    const queryClient = useQueryClient();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const productMutation = useMutation(deleteProduct, {
        onSuccess: () => {
        queryClient.invalidateQueries('products');
        },
    });

    const handleDelete = async () => {
        try {
        await productMutation.mutateAsync(productId);
        } catch (error) {
        console.error('Error deleting product', error);
        }
    };
  
    return (
      <div>
        {confirmDelete ? (
          <div>
            <p>Delet product</p>
            <button onClick={handleDelete}>yes</button>
            <button onClick={() => setConfirmDelete(false)}>cancel</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)}>delete</button>
        )}
      </div>
    );
}


export default DeleteProduct