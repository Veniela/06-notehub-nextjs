import { fetchNotes } from '@/lib/api';   // ← маленька літера
import css from './Notes.client.module.css';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function App() {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
  queryKey: ['notes', "", 1],
  queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }), // ← правильний виклик з об'єктом
});

  return (
    <>
      <div className={css.app}>
       <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient/>
    </HydrationBoundary>
      </div>
    </>
  );
}