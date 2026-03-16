import { useProductivitySupabaseClient } from '~~/layers/productivity/server/services/database';

const supabaseClient = useProductivitySupabaseClient();

export interface TodoDto {
  id: string;
  text: string;
  done: boolean;
  created_at: string;
  updated_at: string;
}

export function useToDoStorage() {
  async function load(): Promise<TodoDto[]> {
    const result = await supabaseClient
      .from('todos')
      .select('*')
      .order('done', { ascending: true })
      .order('created_at', { ascending: true });

    if (!result.data || result.data.length === 0) {
      return [];
    }

    return result.data;
  }

  async function save(todo: { text: string }): Promise<TodoDto> {
    // Check the current count to enforce the 100-item limit
    const countResult = await supabaseClient
      .from('todos')
      .select('*', { count: 'exact', head: true });

    const count = countResult.count || 0;

    if (count >= 100) {
      throw new Error('todo limit reached');
    }

    const result = await supabaseClient
      .from('todos')
      .insert({ text: todo.text, done: false })
      .select();

    if (!result.data || result.data.length === 0) {
      throw new Error('failed to create todo');
    }

    return result.data[0];
  }

  async function update(id: string, todo: Partial<{ text: string; done: boolean }>): Promise<TodoDto> {
    const result = await supabaseClient
      .from('todos')
      .update(todo)
      .eq('id', id)
      .select();

    if (!result.data || result.data.length === 0) {
      throw new Error('todo not found');
    }

    return result.data[0];
  }

  async function remove(id: string): Promise<void> {
    await supabaseClient
      .from('todos')
      .delete()
      .eq('id', id);
  }

  return {
    load,
    save,
    update,
    remove,
  };
}
