import { supabase } from './supabase/Client';
//crear un post
export async function insertPost(data) {
    try {
        const { data: insertedData, error } = await supabase
            .from('Posts')
            .insert([data]);
        if (error) {
            console.error('Error al insertar la fila:', error);
            throw error;
        }
        return insertedData ? insertedData[0] : null;
    }
    catch (error) {
        console.error('Error al insertar la fila:', error);
        throw error;
    }
}
//obtener todos los posts
export const getAllPosts = async ({ userId, title = '', category = '', color = '', sortOrder = 'asc' }) => {
    try {
        let query = supabase.from('Posts').select('*');
        // Solo agregar el filtro por userId si está presente
        if (userId) {
            query = query.eq('userId', userId);
        }
        if (title) {
            query = query.ilike('title', `%${title}%`);
        }
        if (category) {
            query = query.eq('category', category);
        }
        if (color) {
            query = query.eq('color', color);
        }
        const { data, error } = await query;
        if (error) {
            throw error;
        }
        if (sortOrder === 'asc') {
            data.sort((a, b) => a.price - b.price);
        }
        else if (sortOrder === 'desc') {
            data.sort((a, b) => b.price - a.price);
        }
        return data;
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
export const getUserById = async (userId) => {
    try {
        console.log('UserID used for query:', userId); // Log para depuración
        const { data, error } = await supabase
            .from('Users')
            .select('*')
            .eq('userId', userId)
            .single(); // Usa single() para esperar un solo registro
        if (error) {
            throw error;
        }
        console.log('Fetched user data:', data); // Log para depuración
        return data;
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return null; // Retorna null si hay un error
    }
};
// Actualizar un post
export async function updatePost({ id, title, price, category, brand, color, size, }) {
    try {
        const { error } = await supabase
            .from('Posts')
            .update({ title, price, category, brand, color, size })
            .eq('id', id);
        if (error) {
            console.error('Error al actualizar el post:', error);
            throw error;
        }
    }
    catch (error) {
        console.error('Error al actualizar el post:', error);
        throw error;
    }
}
// Eliminar un post
export async function deletePost(postId) {
    try {
        const { error } = await supabase
            .from('Posts')
            .delete()
            .eq('id', postId);
        if (error) {
            console.error('Error al eliminar el post:', error);
            throw error;
        }
    }
    catch (error) {
        console.error('Error al eliminar el post:', error);
        throw error;
    }
}
// Función para actualizar un usuario
export async function updateUser(userId, userData) {
    try {
        const { error } = await supabase
            .from('Users')
            .update(userData)
            .eq('userId', userId);
        if (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    }
    catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
}
