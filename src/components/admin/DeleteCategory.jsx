import React ,{ useState } from "react";
import { deleteCategory } from "../services/ProductsApi";
import { useMutation, useQueryClient } from "react-query";


const DeleteCategory = ({categoryId})=>{
    const queryClient = useQueryClient();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const categoryMutation = useMutation(deleteCategory, {
        onSuccess: () => {
        queryClient.invalidateQueries('categories');
        },
    });

    const handleDelete = async () => {
        try {
        await categoryMutation.mutateAsync(categoryId);
        } catch (error) {
        console.error('Error deleting category', error);
        }
    };
  
    return (
      <div>
        {confirmDelete ? (
          <div>
            <p>Delet category</p>
            <button onClick={handleDelete}>yes</button>
            <button onClick={() => setConfirmDelete(false)}>cancel</button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)}>delete</button>
        )}
      </div>
    );
}


export default DeleteCategory